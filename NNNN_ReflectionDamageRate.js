/*:
 * @target MZ
 * @plugindesc [v1.0.0] NNNN_ReflectionDamageRate - 反射傷害倍率系統 / Reflection Damage Rate System / 反射ダメージ倍率システム
 * @author NNNN/Khla
 * @version 1.1.0
 * @description 擴展反射系統，支援物理反射和可調整的反射傷害倍率 / Extended reflection system with physical reflection and adjustable damage rates / 物理反射と調整可能な反射ダメージ倍率を持つ拡張反射システム
 * 
 * @param damageCalculationMode
 * @text 傷害計算模式 / Damage Calculation Mode / ダメージ計算モード
 * @desc 多個反射倍率的計算方式 / How to calculate multiple reflection rates / 複数の反射倍率の計算方法
 * @option 相加 / Add / 加算
 * @value add
 * @option 最大值 / Maximum / 最大値
 * @value max
 * @option 優先級 / Priority / 優先度
 * @value priority
 * @default add
 * 
 * @param bothDamage
 * @text 雙方受傷 / Both Take Damage / 両方がダメージを受ける
 * @desc 反射時是否雙方都受傷 / Whether both parties take damage on reflection / 反射時に両方がダメージを受けるか
 * @type boolean
 * @default false
 * 
 * @param defaultDamageRate
 * @text 預設傷害倍率(%) / Default Damage Rate(%) / デフォルトダメージ倍率(%)
 * @desc 沒有設定反射倍率時的預設值 / Default value when no reflection rate is set / 反射倍率が設定されていない場合のデフォルト値
 * @type number
 * @min 0
 * @max 1000
 * @default 100
 * 
 * @param enablePhysicalReflection
 * @text 啟用物理反射 / Enable Physical Reflection / 物理反射を有効
 * @desc 是否啟用物理攻擊反射功能 / Enable physical attack reflection / 物理攻撃反射機能を有効にするか
 * @type boolean
 * @default true
 * 
 * @param physicalReflectionText
 * @text 物理反射文字 / Physical Reflection Text / 物理反射テキスト
 * @desc 物理反射的顯示文字 / Physical reflection text / 物理反射の表示テキスト
 * @type string
 * @default Physical Reflection
 * 
 * @param phyRefRateParamIndex
 * @text 物理反射率索引 / Physical Reflection Rate Param Index / 物理反射率パラメータ索引
 * @desc 物理反射率的索引 / Index for physical reflection rate / 物理反射率の索引
 * @type number
 * @min 0
 * @max 99
 * @default 10
 * 
 * @param magRefDamageSparamIndex
 * @text 魔法反射傷害倍率索引 / Magical Reflection Damage Rate Param Index / 魔法反射ダメージ倍率パラメータ索引
 * @desc 魔法反射傷害倍率的索引 / Index for magical reflection damage rate / 魔法反射ダメージ倍率の索引
 * @type number
 * @min 0
 * @max 99
 * @default 10
 * 
 * @param phyRefDamageParamIndex
 * @text 物理反射傷害倍率索引 / Physical Reflection Damage Rate Param Index / 物理反射ダメージ倍率パラメータ索引
 * @desc 物理反射傷害倍率的索引 / Index for physical reflection damage rate / 物理反射ダメージ倍率の索引
 * @type number
 * @min 0
 * @max 99
 * @default 11
 * 
 * @param enableDebug
 * @text 啟用除錯模式 / Enable Debug Mode / デバッグモードを有効
 * @desc 在控制台顯示反射計算過程 / Show reflection calculation in console / コンソールに反射計算を表示
 * @type boolean
 * @default false
 * 
 * @help NNNN_ReflectionDamageRate.js
 * 
 * ============================================================================
 * 反射傷害倍率系統 v1.0.0 / Reflection Damage Rate System / 反射ダメージ倍率システム
 * ============================================================================
 * 
 * 【功能特色 / Features / 機能】
 * ・擴展原生反射系統，新增物理反射功能
 * ・可調整反射傷害倍率
 * ・支援技能禁用反射
 * ・多種傷害計算模式
 * ・Extended native reflection system with physical reflection
 * ・Adjustable reflection damage rates
 * ・Skill-based reflection disabling
 * ・Multiple damage calculation modes
 * ・ネイティブ反射システムを拡張し、物理反射機能を追加
 * ・反射ダメージ倍率の調整可能
 * ・スキルベースの反射無効化
 * ・複数のダメージ計算モード
 * 
 * 【註記標籤 / Note Tags / ノートタグ】
 * 
 * 狀態、防具、武器、角色/敵人、職業 / States, Armors, Weapons, Actors/Enemies, Classes / ステート、防具、武器、アクター/エネミー、クラス：
 * <physicalReflectionRate:X>     - 物理反射機率 / Physical reflection rate / 物理反射率
 * <physicalReflectionDamageRate:X> - 物理反射傷害倍率 / Physical reflection damage rate / 物理反射ダメージ倍率
 * <magicalReflectionDamageRate:X>  - 魔法反射傷害倍率 / Magical reflection damage rate / 魔法反射ダメージ倍率
 * 
 * 技能/物品 / Skills/Items / スキル/アイテム：
 * <disableMagicReflection>      - 禁用魔法反射 / Disable magic reflection / 魔法反射を無効
 * <disablePhysicalReflection>   - 禁用物理反射 / Disable physical reflection / 物理反射を無効
 * <disableReflection>           - 禁用所有反射 / Disable all reflection / すべての反射を無効
 * 
 * 【計算模式說明 / Calculation Modes / 計算モード説明】
 * add      - 所有倍率相加 / Add all rates / すべての倍率を加算
 * max      - 取最大倍率 / Take maximum rate / 最大倍率を取得
 * priority - 按優先級取值(狀態>防具>武器>角色/敵人>職業) / Priority order / 優先順位順
 * 
 * 【原生功能對比 / Native Function Comparison / ネイティブ機能比較】
 * 原生：僅魔法傷害會被反射 / Native: Only magic damage is reflected / ネイティブ：魔法ダメージのみ反射
 * 擴展：物理和魔法傷害都可被反射 / Extended: Both physical and magic damage can be reflected / 拡張：物理と魔法両方のダメージが反射可能
 * 
 * 原生：反射後僅攻擊者受傷 / Native: Only attacker takes damage after reflection / ネイティブ：反射後は攻撃者のみダメージ
 * 擴展：可控制雙方或僅攻擊者受傷 / Extended: Control both or only attacker takes damage / 拡張：両方または攻撃者のみのダメージを制御
 * 
 * 原生：反射傷害倍率固定為1 / Native: Reflection damage rate is fixed at 1 / ネイティブ：反射ダメージ倍率は1で固定
 * 擴展：可調整反射傷害倍率 / Extended: Adjustable reflection damage rates / 拡張：反射ダメージ倍率調整可能
 * 
 * ============================================================================
 */

(() => {
    'use strict';
    
    // Meta tag constants
    const META_KEYS = {
        PHYSICAL_REFLECTION_RATE: 'physicalReflectionRate',
        PHYSICAL_REFLECTION_DAMAGE_RATE: 'physicalReflectionDamageRate',
        MAGICAL_REFLECTION_DAMAGE_RATE: 'magicalReflectionDamageRate',
        DISABLE_REFLECTION: 'disableReflection',
        DISABLE_MAGIC_REFLECTION: 'disableMagicReflection',
        DISABLE_PHYSICAL_REFLECTION: 'disablePhysicalReflection'
    };
    
    // Plugin parameters
    const pluginName = 'NNNN_ReflectionDamageRate';
    const parameters = PluginManager.parameters(pluginName);
    const damageCalculationMode = parameters['damageCalculationMode'] || 'add';
    const bothDamage = parameters['bothDamage'] === 'true';
    const defaultDamageRate = Number(parameters['defaultDamageRate']) / 100 || 1.0;
    const enablePhysicalReflection = parameters['enablePhysicalReflection'] === 'true';
    const physicalReflectionText = parameters['physicalReflectionText'] || '%1 反射了物理攻擊';
    const magicalReflectionDamageRateParamIndex = Number(parameters['magRefDamageParamIndex']) || 10;
    const physicalReflectionRateParamIndex = Number(parameters['phyRefRateParamIndex']) || 10;
    const physicalReflectionDamageRateParamIndex = Number(parameters['phyRefDamageParamIndex']) || 11;
    const enableDebug = parameters['enableDebug'] === 'true';
    
    // Debug logging
    function debugLog(message) {
        if (enableDebug) {
            console.log(`[${pluginName}] ${message}`);
        }
    }
    
    // ============================================================================
    // BattleManager Extensions
    // ============================================================================
    
    const _BattleManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        const isReflectable = this._action.isReflectable();
        const physicalReflectionRate = enablePhysicalReflection ? getPhysicalReflectionRate(target) : 0;
        this._action._originSubject = subject;
        this._action._originTarget = target;
        debugLog(`Action: ${this._action.item().name}, Reflectable: ${isReflectable}, Physical Rate: ${physicalReflectionRate}`);

        this._logWindow.push("pushBaseLine");
        if (Math.random() < this._action.itemCnt(target)) {
            this.invokeCounterAttack(subject, target);
        } else if (Math.random() < physicalReflectionRate && isReflectable && this._action.isPhysical()) {
            target._isPhysicalReflection = true;
            this.invokeRemainDamage(target);
            this.invokePhysicalReflection(subject, target);
        } else if (Math.random() < this._action.itemMrf(target) && isReflectable && this._action.isMagical()) {
            target._isMagicReflection = true;
            this.invokeRemainDamage(target);
            this.invokeMagicReflection(subject, target);
        } else {
            this.invokeNormalAction(subject, target);
        }
        
        subject.setLastTarget(target);
        this._logWindow.push("popBaseLine");

    };
    
    const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
    BattleManager.invokeMagicReflection = function(subject, target) {
        this._action._reflectionAction = true;
        _BattleManager_invokeMagicReflection.call(this,subject,target);
        
        debugLog(`Magic reflection: ${subject.name()} -> ${target.name()}`);
    };

    BattleManager.invokePhysicalReflection = function(subject, target) {
        this._action._reflectionAction = true;
        _BattleManager_invokeMagicReflection.call(this,subject,target);
        
        debugLog(`Physical reflection: ${subject.name()} -> ${target.name()}`);
    };
    BattleManager.invokeRemainDamage = function(target){
        if(!bothDamage){
            return;
        }
        this._action._remainedDamage = true;
        this._action.apply(target);
    }
    Object.defineProperty(TextManager, "physicalReflection", {
        get: function() {
            return physicalReflectionText;
        },
        configurable: true
    });

    const _Window_BattleLog_displayReflection = Window_BattleLog.prototype.displayReflection;
    Window_BattleLog.prototype.displayReflection = function(target) {
        if(target._isMagicReflection){
            _Window_BattleLog_displayReflection.call(this, target);
        }else{
            this.push("performReflection", target);
            this.push("addText", TextManager.physicalReflection.format(target.name()));
        }
    };
    // ============================================================================
    // Game_Action Extensions
    // ============================================================================
    
    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        let calcTarget = target;
        if(this.originTarget()){
            calcTarget = this.originTarget();
        }
        let value = _Game_Action_makeDamageValue.call(this, calcTarget, critical);
        if(!this._originDamage){
            this._originDamage = value;
        }
        debugLog('originalDamage:',this.originDamage())
        if (this.isReflectionAction()) {
            
            const reflectDamageRate = this.calculateReflectionDamageRate(calcTarget);
            debugLog('reflectDamage:',this.originDamage()*reflectDamageRate,reflectDamageRate);
            
            value = Math.round(this.originDamage() * reflectDamageRate);
            this._reflectionAction = false;

        }else if(this.isRemainedDamage()){
            
            const reflectDamageRate = this.calculateReflectionDamageRate(calcTarget);
            const remainRate = Math.max(0,1 - reflectDamageRate);
            debugLog('remainingDamage:',this.originDamage()* remainRate,remainRate);
            
            value = Math.round(this.originDamage() * remainRate)
            this._remainedDamage = false;
        }
            
        return value;
    };

    
    Game_Action.prototype.calculateReflectionDamageRate = function(target) {
        const isMagic = this.isMagical();
        const reflectionRate = getReflectionDamageRate(target, isMagic);
        return reflectionRate;
    };
    
    Game_Action.prototype.isReflectionAction = function() {
        return !!this._reflectionAction;
    };
    
    Game_Action.prototype.isRemainedDamage = function() {
        return !!this._remainedDamage;
    };
    
    Game_Action.prototype.originSubject = function() {
        return this._originSubject;
    };
    
    Game_Action.prototype.originTarget = function() {
        return this._originTarget;
    };

    Game_Action.prototype.originDamage = function() {
        return this._originDamage;
    }
    
    Game_Action.prototype.isReflectable = function() {
        const item = this.item();
        if (!item || !item.meta) return true;
        
        const disableAll = item.meta[META_KEYS.DISABLE_REFLECTION];
        const disableMagic = item.meta[META_KEYS.DISABLE_MAGIC_REFLECTION];
        const disablePhysical = item.meta[META_KEYS.DISABLE_PHYSICAL_REFLECTION];
        
        if (disableAll) return false;
        if (this.isMagical() && disableMagic) return false;
        if (this.isPhysical() && disablePhysical) return false;
        
        return true;
    };
    // ============================================================================
    // Game_Battler Extension
    // ============================================================================
    Object.defineProperty(Game_BattlerBase.prototype,"prf",{
        get: function() {
            return this.xparam(physicalReflectionRateParamIndex);
        },
        configurable: true
    });
    Object.defineProperty(Game_BattlerBase.prototype,"prd",{
        get: function() {
            return this.sparam(physicalReflectionDamageRateParamIndex);
        },
        configurable: true
    });
    Object.defineProperty(Game_BattlerBase.prototype,"mrd",{
        get: function() {
            return this.sparam(magicalReflectionDamageRateParamIndex);
        },
        configurable: true
    });
    Game_BattlerBase.prototype.xparam = function(xparamId) {
        if(xparamId === physicalReflectionRateParamIndex){
            return getPhysicalReflectionRate(this);
        }
        return this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);
    };

    Game_BattlerBase.prototype.sparam = function(sparamId) {
        if(sparamId === magicalReflectionDamageRateParamIndex){
            return getReflectionDamageRate(this,true);
        }else if(sparamId === physicalReflectionDamageRateParamIndex){
            return getReflectionDamageRate(this,false);
        }
        return this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);
    };
    
    const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
    const _Game_Battler_performReflection = Game_Battler.prototype.performReflection;
    Game_Battler.prototype.performReflection = function() {
        if(bothDamage){
            _Game_Actor_performDamage.call(this);
        }
        _Game_Battler_performReflection.call(this);

    };



    // ============================================================================
    // Helper Functions
    // ============================================================================
    
    function getPhysicalReflectionRate(target) {
        const elements = findAllMetaObjects(target);
        const reflectRates = [];
        
        for (const el of elements) {
            if (el && el.meta && el.meta[META_KEYS.PHYSICAL_REFLECTION_RATE] !== undefined) {
                const rate = Number(el.meta[META_KEYS.PHYSICAL_REFLECTION_RATE]);
                if (!isNaN(rate)) {
                    reflectRates.push(rate);
                }
            }
        }
        return calculateRate(reflectRates, 0);
    }
    
    function getReflectionDamageRate(target, isMagic) {
        const elements = findAllMetaObjects(target);
        const damageRates = [];
        const metaKey = isMagic ? META_KEYS.MAGICAL_REFLECTION_DAMAGE_RATE : META_KEYS.PHYSICAL_REFLECTION_DAMAGE_RATE;
        
        for (const el of elements) {
            if (el && el.meta && el.meta[metaKey] !== undefined) {
                const rate = Number(el.meta[metaKey]);
                if (!isNaN(rate)) {
                    damageRates.push(rate);
                }
            }
        }
        
        return calculateRate(damageRates, defaultDamageRate);
    }
    
    function calculateRate(rates, fallbackValue) {
        if (rates.length === 0) {
            return fallbackValue;
        }
        
        let result = fallbackValue;
        switch (damageCalculationMode) {
            case 'add':
                result = rates.reduce((a, b) => a + b, 0);
                break;
            case 'priority':
                result = rates[0]; // First valid rate has highest priority
                break;
            case 'max':
                result = Math.max(...rates);
                break;
            default:
                result = fallbackValue;
                break;
        }
        return Math.max(0, result/100);
    }
    
    function findAllMetaObjects(target) {
        const elements = [];
        
        // States (highest priority)
        if (target.states) {
            elements.push(...target.states());
        }
        
        // Equipment
        if (target.armors) {
            elements.push(...target.armors().filter(item => item));
        }
        if (target.weapons) {
            elements.push(...target.weapons().filter(item => item));
        }
        
        // Actor/Enemy data
        if (target.isActor && target.isActor()) {
            elements.push(target.actor());
            if (target.currentClass) {
                elements.push(target.currentClass());
            }
        } else if (target.enemy) {
            elements.push(target.enemy());
        }
        const results = elements.filter(el => el && el.meta);
        return results;
    }
    
})();
