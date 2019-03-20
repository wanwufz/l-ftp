# 简单易用的文件上传

1. 在 `package.json` 文件中创建 `l-ftp` 字段

2. 填入相应服务器及本地要传的文件信息, 比如：
    ```json
    "l-ftp": {
      "localRoot": "dist", // 本地目录
      "remoteRoot": "/XXX/web-server/",  // 服务器目录
      "ftp": {
        "username": "xxx", // 用户名
        "password": "xxx", // 密码
        "host": "xx.xx.xx.xx", // 服务器地址
        "port": "21" //端口号 默认 21
      }
    }
    ```

3. 在 `package.json` 文件中配置命令, 比如：
    ```json
    "scripts": {
      "pust-ftp": "pust-l" // 默认识别“l-ftp”字段作为配置信息
    }
    ```

4. 要配置多个上传路径及上传命令可如下操作：
    ```json
    "scripts": {
      "pust-dev": "pust-l ftp1",
      "pust-pro ": "pust-l ftp2",
    },
    "ftp1":{
      ...
    },
    "ftp2":{
      ...
    }
    ```
    
5. 运行配置好的命令即可上传， 比如
    ```bash
    npm run push-ftp
    ```