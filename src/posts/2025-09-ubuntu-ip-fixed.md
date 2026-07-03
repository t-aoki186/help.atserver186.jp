---
title: 【Ubuntu Server】IPアドレスを固定する方法
author: 青木
date: 2025-09-14
category: server
tags: server,ubuntu,linux,ネット,config
heading: 
thumbnail: https://pic.atserver186.jp/img/tohofes/thumbnail/webp/no-image.webp
---

再起動したときなどにサーバーのipが勝手に変わってしまうのはめんどうですよね。自分はATSERVERのサービスを動かしているすべてのVMのipを固定していなかったので鯖全体が落ちた時地獄でした...
なので今回はUbuntu serverでipを固定する方法を紹介します。

# 入力するコマンド

ネットの設定ファイルがある場所に移動

```
cd /etc/netplan/
```

設定ファイルの名前を確認

```
ls
```

大体`50-cloud-init.yaml`です。

設定ファイルを開く
自分はnano派なのでnanoで開きます

```
sudo nano 50-cloud-init.yaml
```

なにもいじっていなければ中身はこうなっていると思います
```
network:
  version: 2
  ethernets:
    ens18:
      dhcp4: true
```

固定用の内容に書き換える
```
network:
  version: 2
  ethernets:
    ens18:     #ip aして出てきたご自身のNIC名に変更(大体はens18)
      dhcp4: no
      addresses: [192.168.x.x/24]  # ubuntuに設定したいIPアドレス
      routes:
        - to: default
          via: 192.168.x.1          # ルータのIPアドレス(デフォルトゲートウェイ)
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]  # DNSサーバー(Google,Cloudflare)
```

コメントアウトに従ってご自身の環境に合わせたipを入力してください。

構文エラーがないか確かめる
ここからはsshなどで捜査している場合は面倒くさくなるので実機でやることを推奨します

```
sudo netplan try
```

エラーがなければ適応します

```
sudo netplan apply
```

これでIP固定は完了です。