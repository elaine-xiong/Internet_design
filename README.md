## travel_notebook
一、项目介绍
	项目开发了一个基于Vue + Node.js + MySQL的网页版个人旅游日志，用户可以通过点击中国地图中的省份（目前只做了江浙沪三个省份，地图剩余部分使用简单矩形代替），记录并管理自己在不同地区的旅行日记，支持对日记内容的CRUD操作并同步到数据库中（增删改查）。
	
二、项目技术介绍
	前端	：Vue 3 + Vite + HTML/CSS/JavaScript
	后端	：Node.js + Express
	数据库：	MySQL
	通信方式：	RESTful API（JSON）
	
三、交互流程及效果
1.	用户在前端页面点击地图中的某个省份
2. 前端向后端发送请求，请求该省份对应的旅行日记
3. 后端从 MySQL 数据库中查询数据并返回给前端
4. 前端渲染日记列表
5. 用户新增 / 编辑 / 删除日记
6. 前端通过 Axios 调用后端 API
7. 后端对数据库进行增删改操作
8. 操作结果返回前端并实时更新页面显示

四、数据库设计
	只设置了一个表“diary”：
			字段名	    类型                 说明
			id	            BIGINT	            日记唯一标识
			province	VARCHAR(20)	所属省份
			content	TEXT	            日记内容
			time	        VARCHAR(50)	记录时间

## data_analyse
一、	项目介绍
	项目从kaggle网站中选择了一个“22-24年全球巧克力销量”的数据集，对该数据集进行了结构分析、数据清洗以及统计分析，分别分析了“月季巧克力销售情况”、“按国家分类的巧克力销售情况”和“畅销的产品”三项数据，并把统计结果分别转换为折线图、竖向柱状图、横向柱形图和饼图进行了数据可视化展示。
	操作同时以markdown格式标注在代码中。
	
二、	数据集结构
1.	数据格式：CSV 文件
2.	数据规模：3282 条销售记录
3.	主要字段：
	1. Sales Person（销售人员）
	2. Country（国家）
	3. Product（产品类型）
	4. Date（交易日期）
	5. Amount（销售金额）
	6. Boxes Shipped（出货数量）

三、	使用的工具
1.	Python
2.	Pandas
3.	Matplotlib
4.	Jupyter Notebook
