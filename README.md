# Dormitory-Management-System

## 系統架構
* MVC ：
    * 模型（Model） - 程式設計師編寫程式應有的功能（實現演算法等等）、資料庫專家進行資料管理和資料庫設計(可以實現具體的功能)。
    * 視圖（View） - 介面設計人員進行圖形介面設計。
    * 控制器（Controller）- 負責轉發請求，對請求進行處理。

* Nodejs MVC 架構下處理請求的過程：
    1. client端發送請求(request)抵達server端
    2. server端將請求交由router處理
    3. router通過路徑匹配，將請求導向對應的controller
    4. controller 收到請求，向 model 索要數據
    5. model 給 controller 返回其所需數據
    6. controller 對收到的數據進行判斷、處理
    7. controller 將處理好的數據交給 view
    8. view 根據數據和模板(css)生成響應內容(html)
    9. server端將此內容回覆(response)給client端

* server: 
    1.    監聽(listen)
    2.    回覆請求(response)
* router: 將請求交由正確的controller處理或選擇view
* controllers: 
    1.    執行條件判斷，從 model 中取出數據，傳遞給 view
    2.    將資料新增至model中
* model: 提供數據（from database)
* view: 提供 html（hbs)
## 頁面功能
* manager : 
    * home_manager : 管理者主頁面 可選擇執行不同功能
	* manager_to_message : 新增公告 瀏覽學生留言
	* manager : 顯示該manager的基本資料 提供更新基本資料之功能
	* manager_to_student : 新增新學生 刪除學生 查詢學生基本資料
	* manager_to_apply : 審核尚未審核之住宿申請 查詢所有住宿申請 審核通過後自動分發房間
	* manager_to_violation : 查詢學生違規紀錄 提供修改違規內容及懲處之功能
	* manager_to_dormitory : 可查詢所有房間或公共空間之設備種類、數量及狀況 並提報修功能 可更新目前設備狀況
* student : 
	* home_studnet : 學生主頁面 可選擇執行不同功能
	* student_to_message : 瀏覽公告 新增留言
	* student : 顯示該名學生之基本資料 可自行修改連絡電話及e-mail
	* student_to_manager : 顯示所有管理者資訊 以利學生聯絡
	* student_to_apply : 可申請該學期住宿 並提供瀏覽目前申請狀況 及自動分發後的房間
	* student_to_violation : 可查看該學生之所有違規紀錄
	* student_fix : 可查看及報修該學生房間之設備
	* student_to_dormitory : 所有宿舍房型及價錢
	* dormitory_detail : 宿舍詳細介紹
