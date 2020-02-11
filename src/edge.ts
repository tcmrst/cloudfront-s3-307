import { Context, Callback } from "aws-lambda";
import lodashSet from "lodash/set";
import { getType } from "mime";

import AWS from "aws-sdk";
AWS.config.update({ region: AWS_REGION });
const S3 = new AWS.S3();

const VALID_FILES = ["index.html", "script.js", "style.css"];

export async function handler(
  event: any,
  _context: Context,
  callback: Callback
): Promise<void> {
  const { request, response } = event.Records[0].cf;
  const requestUri: string = request.uri;

  try {
    if (response.status !== "307") {
      throw new Error(`cache hit: ${requestUri}`);
    }

    if (!VALID_FILES.includes(requestUri.substring(1))) {
      throw new Error(`invalid file: ${requestUri}`);
    }

    console.log(`cache miss: ${requestUri}`);

    response.body = (await S3.getObject({
      Bucket: CLOUDFRONT_BUCKET_NAME,
      Key: requestUri.substring(1)
    }).promise()).Body.toString();

    response.status = 200;
    lodashSet(
      response,
      ["headers", "content-type", "0", "value"],
      getType(requestUri)
    );
  } catch (e) {
    console.error(e);
  } finally {
    return callback(null, response);
  }
}
