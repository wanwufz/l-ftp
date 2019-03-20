#!/usr/bin/env node

const { file_list, dir_list, ftp } = require('l-ftp/lib/get_list')()

try {
  if(ftp.port === '21' || ftp.port === undefined){
    require('./lib/ftp').start(dir_list, file_list, ftp)
  }else{
    require('./lib/sftp').start(dir_list, file_list, ftp)
  }
} catch (error) {
  console.log('文件上传错误: ', error)
  process.exit()
}