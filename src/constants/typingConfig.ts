// src/constants/typingConfig.ts

export const TYPING_CONFIG = {
    // Основные настройки скорости
    speed: 600, // символов в минуту
    msPerMinute: 60000, // количество миллисекунд в минуте (60 * 1000)

    // Временные параметры
    cursor: {
        blinkInterval: 400, // ms Частота моргания курсора (как в старых терминалах)
        width: '0.5rem',
        height: '1.25rem'
    },
    delays: {
        lineStart: 1000, // ms Базовая задержка перед началом печати команды
        preTyping: 1500, // ms задержка перед началом печати с мигающим курсором
        interCommand: 1500, // ms пауза между появлением разных команд в терминале
        postTyping: 1500, // ms пауза после окончания печати строки, когда курсор еще виден
        postComplete: 0 // ms Дополнительная задержка перед вызовом onComplete
    }
};

export const getTypingParams = (textLength: number) => {
    const charDelay = TYPING_CONFIG.msPerMinute / TYPING_CONFIG.speed; // Преобразуем скорость в задержку между символами
    const typingDuration = textLength * charDelay;
    const totalLineDuration = typingDuration + TYPING_CONFIG.delays.postTyping;

    return {
        charDelay,
        typingDuration,
        totalLineDuration
    };
};