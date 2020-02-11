CloudFront + S3 で、一時的に 307 Temporary Redirect になる問題を、Lambda@Edge を使って回避するサンプルコードです。  
解説はこちら:https://hitahita.dev/cloudfront-s3-307/

# 使い方

[awscli](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv1.html)・[AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)・[jq](https://stedolan.github.io/jq/)・[Node.js](https://nodejs.org)が必要です。

parameters.json 内のパラメータを書き換え・以下の S3 バケットをリージョンを指定して作る。
| パラメータ名 | S3 のリージョン |
| ---- | ---- |
| DeployBucketName | parameters.json の OriginRegion と同じ |
| DeployEdgeBucketName | us-east-1 |

コマンドを実行し、AWS にデプロイ、最後に表示された URL を開く。

```
$ npm install
$ npm run deploy
$ npm run -s show-url
```
