package handlers

import (
    "github.com/labstack/echo/v4"
    "net/http"
)

// スキルデータ
var skillsData = []struct {
    Category string   `json:"category"`
    Items    []string `json:"items"`
}{
    {
        Category: "プログラミング言語",
        Items:    []string{"Go", "JavaScript", "TypeScript", "Python"},
    },
    {
        Category: "フレームワーク",
        Items:    []string{"React", "Vue.js", "Echo", "Gin"},
    },
    {
        Category: "データベース",
        Items:    []string{"MySQL", "PostgreSQL", "MongoDB"},
    },
    {
        Category: "その他",
        Items:    []string{"Docker", "AWS", "Git", "CI/CD"},
    },
}

// GetSkills はスキル情報を返すハンドラ
func GetSkills(c echo.Context) error {
    return c.JSON(http.StatusOK, skillsData)
}