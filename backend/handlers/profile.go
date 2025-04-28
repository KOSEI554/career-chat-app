package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetProfile はプロフィール情報を返すハンドラ
func GetProfile(c echo.Context) error {
    return c.JSON(http.StatusOK, profileData)
}