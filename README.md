# NNNN_ReflectionDamageRate 反射傷害倍率系統

## 插件基本資訊 / プラグイン基本情報 / Plugin Basic Information

**插件名稱:** NNNN_ReflectionDamageRate  
**版本:** v1.1.0  
**作者:** NNNN/Khla  
**類型:** 原創插件 (非改寫)  
**更新狀態:** 穩定版本

---

## 1. 插件主要功能簡述

### 繁體中文
反射傷害倍率系統擴展了RPG Maker MZ的原生反射功能，提供更靈活的反射機制：
- 物理反射功能：新增物理攻擊反射，不再僅限於魔法反射
- 可調整反射倍率：支援自訂反射傷害倍率，不再固定為100%
- 多種計算模式：相加、最大值、優先級三種倍率計算方式
- 雙方受傷選項：可控制反射時是否雙方都受傷
- 技能禁用反射：特定技能可禁用反射效果
- 完整調試系統：提供詳細的反射計算過程資訊

### 日本語
反射ダメージ倍率システムはRPG Maker MZのネイティブ反射機能を拡張し、より柔軟な反射メカニズムを提供：
- 物理反射機能：物理攻撃反射を追加、魔法反射のみに限定されない
- 調整可能な反射倍率：カスタム反射ダメージ倍率をサポート、100%固定ではない
- 複数の計算モード：加算、最大値、優先度の3つの倍率計算方法
- 両方ダメージオプション：反射時に両方がダメージを受けるかを制御
- スキル反射無効化：特定スキルで反射効果を無効化
- 完全デバッグシステム：詳細な反射計算プロセス情報を提供

### English
Reflection Damage Rate System extends RPG Maker MZ's native reflection functionality with more flexible reflection mechanics:
- Physical Reflection: Adds physical attack reflection, not limited to magic reflection only
- Adjustable Reflection Rates: Support custom reflection damage rates, no longer fixed at 100%
- Multiple Calculation Modes: Add, maximum, and priority calculation methods for rates
- Both Damage Option: Control whether both parties take damage during reflection
- Skill Reflection Disabling: Specific skills can disable reflection effects
- Complete Debug System: Provides detailed reflection calculation process information

---

## 2. 參數使用說明

### 主要參數 / メインパラメータ / Main Parameters

#### 傷害計算模式 (Damage Calculation Mode)
- **相加 (add)**: 所有反射倍率相加計算
- **最大值 (max)**: 取所有倍率中的最大值
- **優先級 (priority)**: 按優先級順序取值（狀態>防具>武器>角色/敵人>職業）

#### 雙方受傷 (Both Take Damage)
- **true**: 反射時攻擊者和被攻擊者都會受到傷害
- **false**: 反射時僅攻擊者受到傷害（預設）

#### 預設傷害倍率 (Default Damage Rate)
- 當沒有設定反射倍率時的預設值（預設：100%）

#### 物理反射設定
- **啟用物理反射**: 是否開啟物理攻擊反射功能
- **物理反射文字**: 物理反射時的顯示訊息
- **參數索引**: 各種反射率和倍率的參數索引設定

---

## 3. 使用步驟

### 步驟1: 插件管理器設置
1. 啟用 `NNNN_ReflectionDamageRate` 插件
2. 設定傷害計算模式（建議使用 `add` 相加模式）
3. 選擇是否啟用雙方受傷功能
4. 設定預設傷害倍率（通常保持100%）
5. 啟用物理反射功能
6. 開啟調試模式（開發時建議啟用）

### 步驟2: 設定反射屬性
在角色、敵人、職業、狀態、裝備的備註欄中添加標籤：

#### 反射機率設定
```
<physicalReflectionRate:30>     # 30%物理反射機率
```

#### 反射傷害倍率設定
```
<physicalReflectionDamageRate:150>   # 物理反射傷害150%
<magicalReflectionDamageRate:120>    # 魔法反射傷害120%
```

### 步驟3: 技能反射控制
在技能或物品的備註欄中添加禁用標籤：
```
<disableReflection>           # 禁用所有反射
<disableMagicReflection>      # 僅禁用魔法反射
<disablePhysicalReflection>   # 僅禁用物理反射
```

### 步驟4: 測試與調整
1. 啟用調試模式查看計算過程
2. 測試不同組合的反射效果
3. 根據遊戲平衡性調整倍率數值

---

## 4. 使用實例與計算範例

### 範例1: 基本物理反射設定
```
【角色設定】
職業備註: <physicalReflectionRate:25>
         <physicalReflectionDamageRate:120>

【效果】
- 25%機率觸發物理反射
- 反射傷害為原傷害的120%
```

**計算過程:**
```
原始傷害: 100
觸發反射: 25%機率成功
反射傷害: 100 × 1.2 = 120
```

### 範例2: 多重反射倍率疊加
```
【角色設定】
狀態A備註: <magicalReflectionDamageRate:50>
防具備註:  <magicalReflectionDamageRate:80>
職業備註:  <magicalReflectionDamageRate:30>

【計算模式: add (相加)】
總反射倍率: 50% + 80% + 30% = 160%
```

**實戰計算:**
```
敵人魔法攻擊傷害: 200
角色魔法反射率: 100% (必定反射)
反射傷害計算: 200 × 1.6 = 320
最終反射傷害: 320
```

### 範例3: 優先級模式計算
```
【角色設定】
狀態備註: <physicalReflectionDamageRate:200>  # 優先級1
防具備註: <physicalReflectionDamageRate:150>  # 優先級2
武器備註: <physicalReflectionDamageRate:100>  # 優先級3

【計算模式: priority (優先級)】
採用倍率: 200% (狀態優先級最高)
```

### 範例4: 雙方受傷模式
```
【設定】
雙方受傷: true
反射倍率: 80%
原始傷害: 150

【結果】
攻擊者受到傷害: 150 × 0.8 = 120
被攻擊者受到傷害: 150 × (1 - 0.8) = 30
```

### 範例5: 技能禁用反射
```
【技能設定】
技能A備註: <disablePhysicalReflection>
技能B備註: <disableReflection>

【效果】
技能A: 無法被物理反射，但可被魔法反射
技能B: 完全無法被反射
```

---

## 5. 進階應用範例

### 範例A: 反射型坦克角色
```
【角色配置】
職業: 聖騎士
- <physicalReflectionRate:40>
- <physicalReflectionDamageRate:150>
- <magicalReflectionDamageRate:100>

狀態: 反射護盾
- <physicalReflectionRate:20>
- <magicalReflectionDamageRate:50>

【總效果 (add模式)】
物理反射率: 40% + 20% = 60%
物理反射傷害: 150%
魔法反射傷害: 100% + 50% = 150%
```

### 範例B: Boss戰反射機制
```
【Boss階段1】
- 僅魔法反射，倍率200%
- 物理攻擊正常生效

【Boss階段2】
狀態變化: <physicalReflectionRate:100>
         <physicalReflectionDamageRate:300>
- 物理攻擊必定反射，傷害3倍
- 玩家需改用特殊技能
```

### 範例C: 裝備組合效果
```
【反射套裝】
反射盾牌: <physicalReflectionRate:15>
         <physicalReflectionDamageRate:80>

反射護甲: <magicalReflectionDamageRate:60>
         <physicalReflectionDamageRate:40>

【套裝效果】
物理反射率: 15%
物理反射傷害: 80% + 40% = 120%
魔法反射傷害: 60%
```

---

## 6. 調試與測試

### 調試模式輸出範例
```
[NNNN_ReflectionDamageRate] Action: 火球術, Reflectable: true, Physical Rate: 0
[NNNN_ReflectionDamageRate] originalDamage: 180
[NNNN_ReflectionDamageRate] Magic reflection: 哥布林 -> 勇者
[NNNN_ReflectionDamageRate] reflectDamage: 216 1.2
```

### 測試建議
1. **單一反射測試**: 先測試單一來源的反射效果
2. **多重疊加測試**: 測試多個反射源的疊加計算
3. **邊界值測試**: 測試0%、100%、超過100%的倍率
4. **技能禁用測試**: 確認禁用標籤正確生效
5. **雙方受傷測試**: 驗證傷害分配是否正確

---

## 7. 與原生系統的差異

### 原生反射系統限制
- 僅支援魔法反射
- 反射傷害固定為100%
- 反射後僅攻擊者受傷
- 無法禁用特定技能的反射

### 擴展系統優勢
- 支援物理和魔法雙重反射
- 可調整反射傷害倍率
- 支援雙方受傷模式
- 提供技能反射禁用功能
- 多種倍率計算模式
- 完整的調試支援

---

## 8. 注意事項與建議

### 平衡性考量
- 反射倍率過高可能導致遊戲失衡
- 建議物理反射率控制在50%以下
- 反射傷害倍率建議在50%-200%之間

### 效能考量
- 調試模式會影響效能，發佈時建議關閉
- 複雜的反射計算可能影響戰鬥流暢度

### 相容性注意
- 與其他修改戰鬥系統的插件可能有衝突
- 建議按載入順序進行測試

---

## 9. 版權聲明

**授權條款:** MIT License  
**商業使用:** ✅ 允許  
**二次開發:** ✅ 允許  
**轉售權限:** ❌ 禁止轉售原插件  
**署名要求:** 建議保留原作者資訊

---

## 10. 更新日誌

### v1.1.0 (當前版本)
- 新增物理反射功能
- 支援可調整反射傷害倍率
- 新增雙方受傷模式
- 提供技能反射禁用功能
- 完善調試系統

### v1.0.0
- 初始版本發布
- 基礎反射系統擴展
