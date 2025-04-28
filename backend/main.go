package main

import (
    "career-chat-app/handlers"
    "career-chat-app/models"
    "log"

    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func main() {
    // プロフィール情報をロード
    var profile models.Profile
    err := models.LoadJSONData("./data/profile.json", &profile)
    if err != nil {
        log.Fatalf("プロフィールデータの読み込みに失敗しました: %v", err)
    }
    handlers.InitProfileData(profile)

    // Echoインスタンスの作成
    e := echo.New()

    // ミドルウェアの設定
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())
    e.Use(middleware.CORS())

    // ルーティング
    e.GET("/api/chat", handlers.HandleChat)
    e.GET("/api/profile", handlers.GetProfile)
    e.GET("/api/experience", handlers.GetExperience)
    e.GET("/api/skills", handlers.GetSkills)

    // サーバー起動
    e.Logger.Fatal(e.Start(":8080"))
}
