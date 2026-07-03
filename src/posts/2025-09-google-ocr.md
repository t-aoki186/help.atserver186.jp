---
title: Google Tesseract OCRをUbuntu Serverにインストールして使う
author: 青木
date: 2025-09-25
category: server
tags: サーバー,Linux,Google,Tesseract,OCR
heading: 
thumbnail: https://pic.atserver186.jp/img/tohofes/thumbnail/webp/no-image.webp
---

パッケージをアップデート

```
sudo apt update
```

Google Tesseract OCRをインストール

```
sudo apt install tesseract-ocr
```

日本語モデルを追加

```
sudo apt install tesseract-ocr-jpn
```

動作確認

- sample.png：OCR対象の画像ファイル
- output.txt：抽出されたテキストが保存されるファイル
- -l jpn：日本語モデルを指定（英語なら eng）

```
tesseract sample.png output.txt -l jpn
```