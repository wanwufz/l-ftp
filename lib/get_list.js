const fs = require('fs'),path = require('path')
let file_list = [], dir_list = [], config = {}
const get_config = () => {
  let dir = __dirname.replace(/\\/g, '/')
  app_path =  dir.slice(0,dir.lastIndexOf('node_modules'))
  file_path = app_path + '/package.json'
  config_key = ''
  if(process.argv[2] === undefined){
    config_key = 'l-ftp'
  }else{
    config_key = process.argv[2]
  }
  config = require(path.join(file_path))[config_key]
  config.localRoot = path.join(app_path,config.localRoot)
}
const set_fileList = (root, remote) => {
  let dirs = fs.readdirSync(root)
  for(file of dirs){
    let file_path = path.join(root, file)
    remote_path = path.join(remote, file)
    state = fs.statSync(file_path)
    if(state.isDirectory()){
      dir_list.push({
        local_path: file_path,
        remote_path: remote_path,
      })
      set_fileList(file_path, remote_path)
    }else{
      file_list.push({
        local_path: file_path,
        remote_path: remote_path,
      })
    }
  }
}
const start = () => {
  try {
    get_config()
  } catch (error) {
    console.log('获取配置文件错误: ', error)
    process.exit()
  }
  try {
    set_fileList(config.localRoot, config.remoteRoot)
  } catch (error) {
    console.log('本地目录读取失败: ', error)
    process.exit()
  }
  // fs.writeFileSync('./console.json', `${JSON.stringify(dir_list, null, 2)}`)
  return {
    dir_list,
    file_list,
    ftp: config.ftp
  }
}

module.exports = start