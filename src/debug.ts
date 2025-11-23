// 调试工具类 - 生产模式（带持久化支持）
export class Debug {
    private static readonly STORAGE_KEY_DEBUG = 'feishu-debug-enabled';
    private static readonly STORAGE_KEY_VERBOSE = 'feishu-debug-verbose';

    // 初始化：从 localStorage 读取状态
    private static enabled = localStorage.getItem(Debug.STORAGE_KEY_DEBUG) === 'true';
    private static verboseMode = localStorage.getItem(Debug.STORAGE_KEY_VERBOSE) === 'true';

    static log(...args: any[]) {
        if (this.isEnabled()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            console.log(`[Feishu ${timestamp}]`, ...args);
        }
    }

    static warn(...args: any[]) {
        if (this.isEnabled()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            console.warn(`[Feishu ${timestamp}] ⚠️`, ...args);
        }
    }

    static error(...args: any[]) {
        if (this.isEnabled()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            console.error(`[Feishu ${timestamp}] ❌`, ...args);
        }
    }

    static verbose(...args: any[]) {
        if (this.isEnabled() && this.isVerbose()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            console.log(`[Feishu ${timestamp}] 🔍`, ...args);
        }
    }

    static step(stepName: string, ...args: any[]) {
        if (this.isEnabled()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            console.log(`[Feishu ${timestamp}] 📋 STEP: ${stepName}`, ...args);
        }
    }

    static api(method: string, url: string, data?: any) {
        if (this.isEnabled() && this.isVerbose()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            console.log(`[Feishu ${timestamp}] 🌐 API: ${method} ${url}`, data ? data : '');
        }
    }

    static result(operation: string, success: boolean, data?: any) {
        if (this.isEnabled()) {
            const timestamp = new Date().toISOString().substring(11, 23);
            const icon = success ? '✅' : '❌';
            console.log(`[Feishu ${timestamp}] ${icon} ${operation}:`, data ? data : '');
        }
    }

    static enable() {
        this.enabled = true;
        localStorage.setItem(this.STORAGE_KEY_DEBUG, 'true');
        console.log('[Feishu] 🔧 Debug logging enabled (持久化已保存)');
    }

    static disable() {
        this.enabled = false;
        localStorage.removeItem(this.STORAGE_KEY_DEBUG);
        console.log('[Feishu] 🔇 Debug logging disabled');
    }

    static enableVerbose() {
        this.verboseMode = true;
        localStorage.setItem(this.STORAGE_KEY_VERBOSE, 'true');
        console.log('[Feishu] 🔍 Verbose logging enabled (持久化已保存)');
    }

    static disableVerbose() {
        this.verboseMode = false;
        localStorage.removeItem(this.STORAGE_KEY_VERBOSE);
        console.log('[Feishu] 🤫 Verbose logging disabled');
    }

    static isEnabled(): boolean {
        // 实时从 localStorage 读取，确保状态同步
        return localStorage.getItem(this.STORAGE_KEY_DEBUG) === 'true';
    }

    static isVerbose(): boolean {
        // 实时从 localStorage 读取，确保状态同步
        return localStorage.getItem(this.STORAGE_KEY_VERBOSE) === 'true';
    }

    static getStatus(): string {
        return `Debug: ${this.isEnabled() ? 'ON' : 'OFF'}, Verbose: ${this.isVerbose() ? 'ON' : 'OFF'}`;
    }
}
