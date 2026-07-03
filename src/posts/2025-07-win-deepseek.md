---
title: WindowsでDeepSeek-R1を動かす
author: 青木
date: 2025-07-08
category: ai
tags: ai,deepseek,windows
heading: WindowsにDeepSeek-R1をインストールして動かす     
thumbnail: https://pic.atserver186.jp/img/tohofes/thumbnail/webp/no-image.webp
---

今回はWindows PCにインストールしたollama上で中国発のオープンソースAIであるDeepSeek-R1を動作させる方法を紹介します。

ちなみに今回GPUを搭載していないPCでの操作を開設しているのでGPUがあるPCを使っている方は別の記事を見てください。

ollamaでGPUを使えるようにするためにほかにもコマンドを入力しないといけなかったはずです

# ollamaをインストールする

まず、ollama公式サイトからWindows版のインストーラをダウンロードします。

リンクはこちら [https://ollama.com/download](ollama.com/download) ファイルは約1GBほどあるので気長に待ちましょう。

ダウンロードが完了したら、実行しインストーラに従ってインストールを進めてください。

インストールが完了したらollamaがインストールされているか確認しましょう。
```
ollama --version
```
バージョン情報が出力されたらインストール成功です。

# DeepSeekをダウンロードする

ではDeepSeekをあなたのPCにダウンロードし、実行してみましょう

DeepSeek-R1には以下のようにたくさんのモデルがあります。(※2025/07/08時点)
- 1.5B
- 7B
- 8B
- 14B
- 32B
- 70B
- 671B

ちなみに、モデル名の後ろについている「B」は、モデルのパラメータ数を表す単位で、「Billion（10億）」の略です。

例えば、「14B」は140億個のパラメータを持つモデルであることを意味します。

パラメータ数が多いほど、モデルはより複雑なタスクをこなせる傾向にありますが、その分多くのメモリ（VRAM）や計算能力を必要とします。

自分のPCのスペックに合わせてインストールしましょう。

大体の家庭用PCだと7b,8b,14bあたりが限界だと思います(RAM16GB以上の場合)。自分は14bのモデルをインストールすることにします。

```
ollama run deepseek-r1:14b
```
（14b以外のモデルをダウンロードしたい場合はollama run deepseek-r1:モデルbと入力してください）

詳しくはこちらを参考にしてください [https://ollama.com/library/deepseek-r1](ollama.com/library/deepseek-r1)

14Bモデルは9.0GBあるのでダウンロードが終わるまで気長に待ちましょう。

ダウンロードが完了すると以下のような表示になり、ユーザーの入力を受け付けるようになります。

# ローカルに落としたDeepSeekで遊ぶ

それでは、PCにインストールしたDeepSeekにいくつか質問してみましょう。

その前に、DeepSeekを一度終了する方法と、再度起動する方法を確認しておきましょう。

- 終了
```
ctrl+D
```

- 起動
```
ollama run deepseek-r1:14b
```

まず、「DeepSeekについて教えて」と質問すると以下のような回答が返ってきました
![https://pic.atserver186.jp/img/tohofes/thumbnail/webp/no-image.webp](画像がどっかいった)
↑画像がどっか行った

見てみると日本語の中に中国語が混ざっています。

これは`日本語のみで回答してください`などの言葉をプロンプトに含ませることで解決するそうです。

次にサイトを書かせてみましょう。

プロンプトは`2000年代風のホームページをhtmlとcssで作って`です。

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2000年代风Website</title>
    <style>
        /* 2000年代风の色 theme */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(45deg, #ff9966, #ffcc66);
        }

        /* 主な容器 */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        /* 根元の要素 */
        .main-content {
            margin-top: 30px;
        }

        h1 {
            color: #ff9966;
            text-align: center;
            font-size: 2em;
        }

        h2 {
            color: #888;
            margin-bottom: 20px;
        }

        /* 表彰 */
        .highlight {
            background: #ffd700;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2em;
            color: #333;
            margin: 20px 0;
        }

        /* 表彰二 */
        .highlight2 {
            background: #ff6b6b;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2em;
            color: #333;
            margin: 0 20px;
        }

        /* 2000年代风格の typography */
        .special-font {
            family: Arial, sans-serif;
            font-weight: bold;
            color: #ff9966;
        }

        /* 表彰二 */
        .highlight3 {
            background: #ff6b6b;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2em;
            color: #333;
            margin: 0 20px;
        }

        /* 表彰 */
        .highlight4 {
            background: #ffd700;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2em;
            color: #333;
            margin: 20px 0;
        }

        /* 表彰 */
        .highlight5 {
            background: #ff6b6b;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.2em;
            color: #333;
            margin: 0 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="main-content">
            <h1>2000年代风Website</h1>

            <!-- 主なコンテンツ -->
            <div class="highlight"> imperfectのmain content </div>

            <!-- 関連情報 -->
            <div class="highlight2">
                <h2>関連情報</h2>
                <p> Detail of this website. </p>
            </div>

            <!-- 参考資料 -->
            <div class="highlight3">
                <h2>参考資料</h2>
                <p> Additional information about this style. </p>
            </div>

            <!-- 付録 -->
            <div class="highlight4">
                <h2>Appendix</h2>
                <p> Appendix information. </p>
            </div>

            <!-- 最終的な/unit -->
            <div class="highlight5">
                <h2>Final Unit</h2>
                <p> 最終的な unit of this website. </p>
            </div>
        </div>
    </div>
</body>
</html>
```

動かしてみるとこんな感じですと言いたいですが、鯖に構成を更新した際にどこかに行ってしまったのでないです。

いつかより大きいモデルでいろいろ遊んでみたいです。

以上