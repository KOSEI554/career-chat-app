package handlers

import (
    "github.com/labstack/echo/v4"
    "net/http"
)

// 職務経験データ
var experienceData = []struct {
    Company     string `json:"company"`
    Role        string `json:"role"`
    Period      string `json:"period"`
    Description string `json:"description"`
}{
    {
        Company:     "株式会社ABC",
        Role:        "バックエンドエンジニア",
        Period:      "2020年4月 - 2022年3月",
        Description: "Goを使用したマイクロサービスの開発と運用",
    },
    {
        Company:     "XYZ株式会社",
        Role:        "フルスタックエンジニア",
        Period:      "2022年4月 - 現在",
        Description: "ReactとGoを用いたWebアプリケーション開発",
    },
}

// GetExperience は職務経験情報を返すハンドラ
func GetExperience(c echo.Context) error {
    return c.JSON(http.StatusOK, experienceData)
}