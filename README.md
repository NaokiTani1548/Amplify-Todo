# 🤖 AI チャットアプリ（Amplify × Amazon Bedrock）

このプロジェクトは、AWS Amplify を基盤とし、Amazon Bedrock を活用して自然言語応答を行う AI チャットアプリです。  
フロントエンドは React + TypeScript を使用し、サーバーレスなバックエンド構成でスケーラブルな運用が可能です。

---

## 🚀 主な技術スタック

| 分類           | 使用技術                                     |
| -------------- | -------------------------------------------- |
| フロントエンド | React + TypeScript                           |
| バックエンド   | AWS Lambda（Amplify Function）               |
| チャット AI    | Amazon Bedrock（Claude, Titan, など）        |
| API 管理       | AWS API Gateway + Lambda（Amplify で自動化） |
| 認証           | AWS Cognito（Amplify Auth）                  |
| インフラ管理   | AWS Amplify CLI / Console                    |

---

## 🚀 デモ URL

👉 https://d37kkcdohbgmcs.cloudfront.net
（Amplify Console 上でホスティング）

---

## 🔧 セットアップ手順

### リポジトリをクローン

```bash
// push未完
git clone https://github.com/your-org/amplify-todo.git
cd amplify-todo
```

### Amplify の初期化（初回のみ）

Amplify アプリ開発準備（React）：

```bash
npm install -g @aws-amplify/cli
npx create-react-app <app-name>
amplify configure
```

Amptify セットアップ（auth とバックエンド追加）

```bash
amplify init
amplify add auth
amplify add api
```

### 5. 開発用サーバー起動

```bash
npm run build
npm run start
```

### デプロイ

```bash
amplify add hosting
amplify publish
```

---

## ✅ 機能一覧

- ✅ ユーザー登録・ログイン・ログアウト（Cognito 連携）
- ✅

---

## 📁 ディレクトリ構成（抜群）

```plaintext
.
├— amplify/                # Amplify CLI によるバックエンド構成
│   └— backend/
├— src/
│   ├— graphql/            # 自動生成されたGraphQLクエリ群
│   ├— types.ts            # Todo型定義
│   ├— App.tsx             # メインコンポーネント
│   └— aws-exports.ts      # Amplify設定
├— public/
├— README.md
├— package.json
└— tsconfig.json
```

---

## 📡 インフラ構成図（概要）

```
[User] ⇄ [CloudFront] ⇄ [S3 (Static Hosting)]
                          |
                          └→ [AppSync (GraphQL API)]
                              |
                              └→ [DynamoDB (Todo Storage)]
                              |
                              └→ [Cognito (Auth)]
```

---

## 🛠 よくある操作コマンド

| コマンド                    | 内容                           |
| --------------------------- | ------------------------------ |
| `amplify pull`              | Amplify の構成をローカルに反映 |
| `amplify push`              | 変更をクラウドに反映           |
| `amplify add api`           | API を追加                     |
| `amplify add auth`          | 認証（Cognito）を追加          |
| `amplify add function`      | lambda コード追加              |
| `amplify override function` | IAM 権限追加                   |
| `amplify status`            | 現在の Amplify 構成を確認      |
| `amplify publish`           | S3 + CloudFront で再デプロイ   |

---

## 👨‍💼 開発チーム向けメモ

- `graphql/mutations.ts`, `graphql/queries.ts` は amplify push 時に自動生成されるファイルです。直接編集しないようにしてください。
- 認証状態は Amplify UI の `withAuthenticator` を使って管理しています。
- GraphQL Client は Amplify API v6 準拠で `generateClient()` を使っています。

---

## ✉ 開発/運用メモ（必要に応じて）

- ***

## 🪑 クリーンアップ方法（リソース削除）

```bash
amplify delete
```

---
