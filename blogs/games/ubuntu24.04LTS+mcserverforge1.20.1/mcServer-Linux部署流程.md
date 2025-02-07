# Ubuntu 24.04 LTC 搭建我的世界1.20.1-forge服务器全流程



## 1. 更新系统安装包
```
sudo apt update
sudo apt upgrade -y
```

## 2. 安装 Java21（自动配置环境）
```
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt update
sudo apt install openjdk-21-jdk -y
```
通过以下命令检查Java是否安装成功
```
java -version
```

## 3.服务端部署
- ## 方法一：安装 MCSM（适用于云服务器且有公网ip，或自己的设备有公网ip的情况）
自动化安装使用以下命令
```
sudo wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```
安装完并配置服务器防火墙端口后就可以在网址 `公网ip:23333` 进行访问面板和开服

- ## 方法二：使用 mc-server 安装包和内网穿透工具（适用于在自己闲置电脑上配置且无公网ip的情况）
### 配置服务器安装包
下载forge服务端jar文件，官方下载网址如下，直接下载最新的版本（latest）


https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html

在ubuntu桌面下新建文件夹，放入forge-server文件，在文件目录下打开终端，使用以下命令

```
./forge-（完整文件名）.jar     # 这里只需要在终端中输入forge，再按Tab键就可自动补全文件名
```
等待自动下载和配置，全部下载完成后可以在文件夹中看到run.sh文件。

在根目录下打开终端终端输入命令 `./run.sh` 启动服务，过一会服务会自动终止，需要修改文件夹中的 eula.txt 文件中的 false 为 ture ，再次启动 run.sh，等待生成世界并在控制面板中出现 `Done` 即可进行下一步。

### 配置内网穿透
> 使用nat123进行内网穿透
1. 安装服务端（针对Ubuntu 24.04 LTS）

本地环境更新
```
apt-get update
```
运行环境安装
```
apt-get install mono-complete
```
查看运行环境版本信息
```
mono -V
```
安装客户端
```
cd .../         # 在需要放置客户端的根目录下打开终端或cd到根目录
mkdir nat123    # 在根目录下新建nat123文件夹
cd nat123       # 进入nat123文件夹中
```
下载安装包
```
wget http://www.nat123.com/down/nat123linux.tar.gz
```
解压安装包
```
tar -xf nat123linux.tar
```
在nat123文件夹中代开终端，输入命令启动客户端
```
mono nat123linux.sh
```
启动后输入账户和密码即可开启服务
2. 配置端口映射

进入nat123官网，注册并登录账户，点击 `端口映射添加`
![端口映射添加](img/nat-1.png)

+ `应用类型` 中选择 `其他（非网站）`

+ `映射线路` 选择 `freevip` 的线路

+ `应用名称` 自定义设置，我这里默认为 `mc-server`

+ `内网端口` 设置为 `25565`

+ `内网地址` 默认 `127.0.0.1`

+ `外网端口` 随便设置，推荐直接使用分配的默认值

+ `外网域名` 设置为 `xxx.域名`，其中xxx是可以自己设置的一个可分辨的值，最好是具有特殊性，如果账户充值 50RMB 以上也可以使用如下图中最后一行的域名

  ![端口映射配置内容示例](img/nat-2.png)

  ​                      如图所配置的内容，这里默认外网域名最前端为 `mmmccc`

  ![端口映射域名配置示例](img/nat-3.png)

  

配置完成后，点击确认保存，使用 `其他（非网站）` 需要充值一定量的N币，建议充值4块钱就行，N币在修改这些配置内容时都要用到，并且nat123的带宽足够流畅运行mc服务器

充值完毕并且确认保存后，等待跳转，就可以看见映射列表中多了一行规则。在mc多人游戏中输入 `xxx.域名:外网端口` 就可以登录服务器

（xxx：自定义的可辨识名称，域名：自己选择的nat123分配的免费域名，外网端口：配置信息中随机分配的外网端口号）

## 如果mc服务器使用了 Simple Voice Chat 模组，需要同上流程一样配置一个新的端口映射，`应用名称` 自定义，但是 `内网端口` 改为 `24454` ，`外网域名` 需要和之前配置的服务器外网域名一致，`外网端口` 随意（经我测试不需要一定映射到外网的24454端口）
![配置simplevoicechat的端口映射](img/nat-4.png)
## 两条规则都配置后就可以在服务器中使用 Simple Voice Chat 模组对话
![配置mc多人游戏服务](img/nat-5.png)