# コントリビュートするにあたって

まず初めに、このプロジェクトに興味を持っていただいたことに感謝します。

このドキュメントでは、このプロジェクトにコントリビュートするにあたって
気をつけること、またコントリビュートする方法について解説します。

> [!NOTE]
> プロジェクトは気に入っているけれど、貢献する時間がないという方も、大丈夫です。
> プロジェクトを支援し、感謝の気持ちを表す簡単な方法は他にもあります。ぜひご協力いただければ幸いです。
>
> - プロジェクトにスターを付ける
> - ツイートする
> - プロジェクトのReadmeでこのプロジェクトを参照してください
> - 地元のミートアップでプロジェクトについて言及し、友人や同僚に伝えてください

## まず読むべきもの

まずコントリビュートするにあたって、以下のドキュメントの内容を把握しておく必要があります。

- [コントリビューター行動規範](./CODE_OF_CONDUCT.md)
- [LICENSE](./LICENSE)

このプロジェクトはMITライセンスですので、このリポジトリにコミットされた段階で、
あなたのコードは誰でも自由に使用することが可能になります。

## 開発環境を整える

開発するにあたって、必要な準備は大きく2つです。

### Bunをインストールする

このプロジェクトでは、[Bun][bun_hp]を使用しています。
[このリンク][bun_install]からインストールしてください。

[bun_hp]: https://bun.sh/
[bun_install]: https://bun.sh/docs/installation

### Dockerをインストールする

> [!NOTE]
> この節は準備中です。

## コントリビュートの流れ

### ブランチを切る

> [!IMPORTANT]
> この節はUniProメンバーのみに対するものであり、その他の方はフォークした上で次の節へお進みください。

まず開発するためにブランチを切ります。
ブランチ名の指定は今のところありません。

### コードを書く

#### スタイリングについて

スタイリングは[Prettier][prettier_hp]を使用しています。

[prettier_hp]: https://prettier.io/

#### コミットメッセージについて

わかりやすく何をしたかをちゃんと書いてくだされば大丈夫です。

### プルリクエストを作成する

プルリクエストを作成します。
プルリクエストを作成するにあたって、以下の情報を含めてください。

- このプルリクエストで行なった変更は何か(例: Issue#34のバグ修正、OIDCの際のユーザーグループ対応)

プルリクエストは他の方からの1つ以上の承認を得るとマージされます。

## バグや新規機能等の提案について

Issueを作成してください。
それぞれに合ったテンプレートを用意しています。

### セキュリティに関わる問題の場合

[セキュリティポリシー](./SECURITY.md)をご覧ください。

## 最後に

改めて、このプロジェクトへ貢献することに興味を示していただいたことに感謝いたします。
もし困ったことがあり、私へ直接連絡したい場合は、<yuito@uniproject.jp>へご連絡ください。
