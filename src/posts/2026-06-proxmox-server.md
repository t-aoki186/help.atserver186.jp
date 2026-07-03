---
title: 【PROXMOX】自宅鯖の構成を更新した
author: 青木
date: 2026-06-15
category: server
tags: server,proxmox,linux
heading: 
thumbnail: https://pic.atserver186.jp/public/blog/article/img/2026-06-proxmox-server.webp
---

# PROXMOXでのサーバー構築

## インストール後に各ノードでやること

### リポジトリ修正
PROXMOXではデフォルトではenterprise設定が有効になっており、enterpriseのライセンスがない環境では頻繁にエラーを表示し、`apt update`などが失敗するのでこの設定を無効にし、無料環境で正常にアップデートができるように設定する必要があります。
始めに、nanoでpve-enterprise.sourcesを開き中身を丸ごと`#`でコメントアウトします。
#### 例:
```
# Types: deb
# URIs: https://enterprise.proxmox.com/debian/pve
# Suites: bookworm
# Components: pve-enterprise
# Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```
次に`no-subscription`版を追加します。
```
nano /etc/apt/sources.list.d/pve-no-subscription.sources
```
中身に以下を追加し、保存します。
```
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: bookworm
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```
設定が完了しましたので、正常にアップデートを行えるか確認しましょう。
```
apt update
```
```
apt full-upgrade -y
```
カーネル更新が入る可能性があるため念のため再起動しておきましょう。
```
reboot
```
これで設定は完了です。

---

### 使わないCephを無効化
nanoでcephの設定ファイルを開き、
```
nano /etc/apt/sources.list.d/ceph.sources
```
すべての行をコメントアウトします。
これで完了です。

---

### NTPサーバーを日本のものにし、精度を上げる
まずchronyの設定ファイルを開きます。
```
nano /etc/chrony/chrony.conf
```
次に最初の方の行にある`pool`から始まる行はコメントアウトします。
次にコメントアウトした`pool`の下の行に以下のコードを追加します。
```
server ntp.nict.jp iburst
pool ntp.jst.mfeed.ad.jp iburst
```
最後に反映させ、
```
systemctl restart chrony
```
正しく反映されているか確認します。
```
chronyc sources
```

---

### ディスクの完全初期化
以前PROXMOXで使用していたディスクがある場合、以下の方法で完全に初期化しないとあとから面倒なことになります。
```
lsblk
```
で、以前のPROXMOX環境で使用されていたディスク名(※1)と、カーネルから見えているディスク名(※2)`(例: /dev/sda)`を確認します。
次に、以下のコマンドでLVM削除を行います。
```
lvremove -y ※1
```
次に、以下のコマンドでボリュームグループ(Volume Group)削除を行います。
```
vgremove ※1
```
次に以下のコマンドでフィジカルボリューム(Physical Volume)削除を行います。
```
pvremove /dev/※2
```
次に以下のコマンドですべてのパーティションの削除を行います。これ重要です。
```
sgdisk --zap-all /dev/※2
```
最後に以下のコマンドで、GPTおよびMBRのデータ構成を完全に削除します。
```
sgdisk --zap-all /dev/※2
```
それでは正しく削除できているか`lsblk`で確認しましょう。
以下のように何もぶら下がっていないように見えれば成功です。
```
root@fuji01:~# lsblk
NAME               MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda                  8:0    0 558.4G  0 disk 
sdb                  8:16   0 278.9G  0 disk 
root@fuji01:~#
```
これが完了すればPROXMOXのGUIで新たなLVM,LVM-thinディスクを作成することができます。

---