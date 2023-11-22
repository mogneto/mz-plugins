/*:
 * @plugindesc Executes a common event when the player or a party member enters a custom state.
 * @author Mogi
 * @version 1.0.0
 * @target MZ
 * @url https://github.com/mogneto/mz-plugins
 * @param State ID
 * @desc Set the state ID that triggers the common event.
 * @default 1
 * @type state
 * @parent State Event Options
 * 
 * @param Common Event ID
 * @desc Set the common event ID that will be executed.
 * @default 1
 * @type common_event
 * @parent State Event Options
 *
 * @help
 * ============================================================================
 * Description:
 * ============================================================================
 * Allows you to execute a common event when the player or a party
 * member enters a custom state. For now, it just supports one state and one common event.
 * 
 * ============================================================================
 * Plugin Parameters:
 * ============================================================================
 * State Event Options:
 *   - State ID: Set the state ID that triggers the common event when the player
 *               or a party member enters the specified state.
 *   - Common Event ID: Set the common event ID that will be executed.
 * 
 * ============================================================================
 * Terms of Use:
 * ============================================================================
 * - Free for use in non-commercial and commercial games.
 * - Please provide credit to Mogi.
 * - Do not claim the plugin as your own.
 * - You can edit the plugin code as you like.
 * - Mogi is not responsible for any damages or liabilities arising from the
 *   use, misuse, or malfunction of this plugin.
 * ============================================================================
 * Version History:
 * ============================================================================
 * 1.0.0 - Fresh baked!
 */

(() => {
    const pluginName = "Mogi_StateEvent";
    const parameters = PluginManager.parameters(pluginName);

    // State ID to trigger the common event
    const stateID = Number(parameters["State ID"]) || 1;

    // Common Event ID to be executed
    const commonEventID = Number(parameters["Common Event ID"]) || 1;

    // Alias Game_BattlerBase to execute the common event when entering the state
    const alias_Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        alias_Game_BattlerBase_addNewState.call(this, stateId);
        if (this.isActor() && stateId === stateID && this.isStateAffected(stateID)) {
            $gameTemp.reserveCommonEvent(commonEventID);
        }
    };
})();
