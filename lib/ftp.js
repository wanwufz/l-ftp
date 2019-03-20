const client = require('ftp')
const ftp = new client()
const progerssBar = require('progress')
const path = require('path')

const send_dirs = (arr,call) => {
  let ins = 0, len = arr.length
  let back=()=>{ins++;if(len===ins){call()}}
  arr.filter(v => {
    let remote_path = v.remote_path.split(path.sep).join('/')
    ftp.mkdir(remote_path, true, (err) => {
      if(err !== undefined){
        console.log(v.remote_path,"==》 目录创建失败")
        console.error(err)
      }
      back()
    })
  })
}
const send_files = (arr, bar ,call) => {
  let ins = 0, len = arr.length
  let back=()=>{ins++;if(len===ins){call()}}
  arr.filter(v => {
    let local_path = v.local_path.split(path.sep).join('/')
    let remote_path = v.remote_path.split(path.sep).join('/')
    ftp.put(local_path, remote_path, (err) => {
      if(err !== undefined){
        console.log(v.local_path,"==》 文件上传失败")
        console.error(err)
      }
      back()
      bar.tick()
    })
  })
}
const start = (dirs, files, config) => {
  let bar = new progerssBar(':percent :bar (当前:current/总计:total)', { 
    total: files.length,
    width: 20,
    complete: '█',
    incomplete: '░',
  })
  ftp.on('ready', () => {
    console.log('服务器已连接')
    send_dirs(dirs, () => {
      console.log('\n×××××××××× 传输开始！××××××××××')
      send_files(files, bar, () => {
        console.log('\n×××××××××× 传输结束！××××××××××')
        ftp.end()
      })
    })
  })
  ftp.on('error', (err) => {
    console.log('连接错误: ',err)
  })
  ftp.connect({
    host: config.host,
    user: config.username,
    password: config.password,
  })
}
module.exports = {
  start: start
}