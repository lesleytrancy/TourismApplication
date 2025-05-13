# Tourism Explorer API Documentation / Tourism Explorer API 使用说明

This document provides detailed instructions for using the Tourism Explorer frontend project API interfaces.  
本文档详细说明了 Tourism Explorer 前端项目中 API 接口的使用方法。

## Table of Contents / 目录
- [Environment Configuration / 环境配置](#environment-configuration--环境配置)
- [API Services Overview / API 服务说明](#api-services-overview--api-服务说明)
- [API Details / 接口详细说明](#api-details--接口详细说明)
- [Usage Examples / 使用示例](#usage-examples--使用示例)
- [Error Handling / 错误处理](#error-handling--错误处理)

## Environment Configuration / 环境配置

Before using the API services, you need to configure the environment variables:  
在使用 API 服务之前，需要配置环境变量：

```javascript
// .env file / .env 文件
REACT_APP_API_BASE_URL=http://localhost:1880/api
```

## API Services Overview / API 服务说明

The API service layer provides three main service modules:  
API 服务层提供了三个主要服务模块：

- Weather Information Service (weatherService) / 天气信息服务 (weatherService)
- Map Information Service (mapService) / 地图信息服务 (mapService)
- Translation Service (translatorService) / 翻译服务 (translatorService)

## API Details / 接口详细说明

### 1. Weather Information Service / 天气信息服务

```javascript
import { weatherService } from '../services/api';

// Get weather information / 获取天气信息
const getWeather = async (location) => {
    try {
        const weatherData = await weatherService.getWeather(location);
        // weatherData format / weatherData 格式：
        // {
        //     city: string,      // City name / 城市名称
        //     temperature: string, // Temperature / 温度
        //     status: string,    // Weather status / 天气状态
        //     suggestion: string // Travel suggestion / 出行建议
        // }
    } catch (error) {
        // Error handling / 错误处理
    }
};
```

### 2. Map Information Service / 地图信息服务

```javascript
import { mapService } from '../services/api';

// Search locations / 搜索地点
const searchLocations = async (params) => {
    try {
        const locations = await mapService.searchLocations({
            location: 'Sydney',    // Location / 位置
            checkIn: '2024-03-20', // Check-in date / 入住日期
            checkOut: '2024-03-25',// Check-out date / 退房日期
            guests: 2              // Number of guests / 客人数量
        });
        // locations format / locations 格式：
        // {
        //     locations: [
        //         {
        //             title: string,  // Location name / 地点名称
        //             img: string,    // Location image URL / 地点图片URL
        //         }
        //     ]
        // }
    } catch (error) {
        // Error handling / 错误处理
    }
};
```

### 3. Translation Service / 翻译服务

```javascript
import { translatorService } from '../services/api';

// Translate text / 文本翻译
const translateText = async (from, to, text) => {
    try {
        const result = await translatorService.translateText(
            'en',   // Source language / 源语言
            'zh',   // Target language / 目标语言
            'Hello' // Text to translate / 待翻译文本
        );
        // result format / result 格式：
        // {
        //     translatedText: string, // Translated text / 翻译后的文本
        //     confidence: number,     // Translation confidence / 翻译置信度
        //     timestamp: string       // Timestamp / 时间戳
        // }
    } catch (error) {
        // Error handling / 错误处理
    }
};
```

## Usage Examples / 使用示例

### Using in React Components / 在 React 组件中使用

```javascript
import React, { useState, useEffect } from 'react';
import { weatherService, mapService, translatorService } from '../services/api';

const TourismComponent = () => {
    const [weather, setWeather] = useState(null);
    const [locations, setLocations] = useState([]);
    const [translation, setTranslation] = useState(null);

    // Get weather information / 获取天气信息
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await weatherService.getWeather('Sydney');
                setWeather(data);
            } catch (error) {
                console.error('Failed to fetch weather / 获取天气信息失败:', error);
            }
        };
        fetchWeather();
    }, []);

    // Search locations / 搜索地点
    const handleLocationSearch = async () => {
        try {
            const result = await mapService.searchLocations({
                location: 'Sydney',
                checkIn: '2024-03-20',
                checkOut: '2024-03-25',
                guests: 2
            });
            setLocations(result.locations);
        } catch (error) {
            console.error('Location search failed / 搜索地点失败:', error);
        }
    };

    // Translate text / 翻译文本
    const handleTranslation = async () => {
        try {
            const result = await translatorService.translateText('en', 'zh', 'Hello');
            setTranslation(result);
        } catch (error) {
            console.error('Translation failed / 翻译失败:', error);
        }
    };

    return (
        // Component rendering logic / 组件渲染逻辑
    );
};
```

## Error Handling / 错误处理

All API calls should use try-catch for error handling:  
所有 API 调用都应该使用 try-catch 进行错误处理：

```javascript
try {
    const data = await weatherService.getWeather('Sydney');
    // Handle successful response / 处理成功响应
} catch (error) {
    // Error handling methods / 错误处理方式：
    console.error('API call failed / API 调用失败:', error);
    // 1. Display error message / 显示错误提示
    // 2. Set error state / 设置错误状态
    // 3. Retry logic / 重试逻辑
    // 4. Fallback handling / 降级处理
}
```

## Important Notes / 注意事项

1. All API calls are asynchronous, use async/await or Promise / 所有 API 调用都是异步的，需要使用 async/await 或 Promise 处理
2. Ensure environment variables are properly configured / 确保在使用前正确配置了环境变量
3. Cancel unfinished API requests when component unmounts / 建议在组件卸载时取消未完成的 API 请求
4. Implement caching for frequently called interfaces / 对于频繁调用的接口，建议实现缓存机制
5. Use HTTPS protocol in production environment / 在生产环境中，应该使用 HTTPS 协议

## Common Issues / 常见问题

1. **CORS Issues / 跨域问题**
   - Ensure backend CORS is properly configured / 确保后端已正确配置 CORS
   - Check if API_BASE_URL is correct / 检查 API_BASE_URL 是否正确

2. **Network Errors / 网络错误**
   - Check network connection / 检查网络连接
   - Verify API server is running / 确认 API 服务器是否运行
   - Validate API address / 验证 API 地址是否正确

3. **Data Format Errors / 数据格式错误**
   - Check request parameter format / 检查请求参数格式
   - Verify response data structure / 验证响应数据结构
   - Ensure data type matching / 确保数据类型匹配

## Changelog / 更新日志

- 2024-03-20: Initial release / 初始版本发布
- Added three main API services: Weather, Map, and Translation / 添加了三个主要 API 服务：天气、地图和翻译
- Implemented basic error handling mechanism / 实现了基本的错误处理机制 