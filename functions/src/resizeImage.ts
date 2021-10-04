import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';

const gcs = new Storage()

// import * as fs from 'fs-extra'


import { tmpdir } from 'os'
import { join, dirname } from 'path'

import * as sharp from 'sharp'

export const resizeAvatar = functions.storage
  .object()
  .onFinalize(async object => {
    // The bukcet we want to download from:
    const bucket = gcs.bucket(object.bucket)
    // Location where file is stored in bucket
    const filePath = object.name;

    if (typeof filePath == 'string') {
      // Get file name by splitting path and popping last element
      const fileName = filePath.split('/').pop();
      // Temp path where we will download file to function file system
      const tmpFilePath = join(tmpdir(), filePath)

      // Rename resized image with avatar_ as prefix
      const avatarFileName = 'avatar_' + fileName;
      const tmpAvatarPath = join(tmpdir(), avatarFileName)

      if (fileName?.includes('avatar_')) {
        console.log('exiting function')
        return false;
      }
      await bucket.file(filePath).download({
        destination: tmpFilePath
      });

      await sharp(tmpFilePath)
        .resize(100, 100)
        .toFile(tmpAvatarPath)

      return bucket.upload(tmpAvatarPath, {
        destination: join(dirname(filePath), avatarFileName)
      })
    }
    return false;
  })
