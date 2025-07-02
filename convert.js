function convertCallbacks(input) {
      
    const callbacks = [
      "tick", "onClose", "onPlayerJoin", "onPlayerLeave", "onPlayerJump", "onRespawnRequest", "playerCommand", "onPlayerChat",
      "onPlayerChangeBlock", "onPlayerDropItem", "onPlayerPickedUpItem", "onPlayerSelectInventorySlot", "onBlockStand",
      "onPlayerAttemptCraft", "onPlayerCraft", "onPlayerAttemptOpenChest", "onPlayerOpenedChest", "onPlayerMoveItemOutOfInventory",
      "onPlayerMoveInvenItem", "onPlayerMoveItemIntoIdxs", "onPlayerSwapInvenSlots", "onPlayerMoveInvenItemWithAmt",
      "onPlayerAttemptAltAction", "onPlayerAltAction", "onPlayerClick", "onClientOptionUpdated", "onMobSettingUpdated",
      "onInventoryUpdated", "onChestUpdated", "onWorldChangeBlock", "onCreateBloxdMeshEntity", "onEntityCollision",
      "onPlayerAttemptSpawnMob", "onWorldAttemptSpawnMob", "onPlayerSpawnMob", "onWorldSpawnMob", "onWorldAttemptDespawnMob",
      "onMobDespawned", "onPlayerAttack", "onPlayerDamagingOtherPlayer", "onPlayerDamagingMob", "onMobDamagingPlayer",
      "onMobDamagingOtherMob", "onPlayerKilledOtherPlayer", "onMobKilledPlayer", "onPlayerKilledMob", "onMobKilledOtherMob",
      "onPlayerPotionEffect", "onPlayerDamagingMeshEntity", "onPlayerBreakMeshEntity", "onPlayerUsedThrowable",
      "onPlayerThrowableHitTerrain", "onTouchscreenActionButton", "onTaskClaimed", "onChunkLoaded", "onPlayerRequestChunk",
      "onItemDropCreated", "onPlayerStartChargingItem", "onPlayerFinishChargingItem", "doPeriodicSave"
    ];

    const minifiedCbSetup=`const callbacks=["tick","onClose","onPlayerJoin","onPlayerLeave","onPlayerJump","onRespawnRequest","playerCommand","onPlayerChat","onPlayerChangeBlock","onPlayerDropItem","onPlayerPickedUpItem","onPlayerSelectInventorySlot","onBlockStand","onPlayerAttemptCraft","onPlayerCraft","onPlayerAttemptOpenChest","onPlayerOpenedChest","onPlayerMoveItemOutOfInventory","onPlayerMoveInvenItem","onPlayerMoveItemIntoIdxs","onPlayerSwapInvenSlots","onPlayerMoveInvenItemWithAmt","onPlayerAttemptAltAction","onPlayerAltAction","onPlayerClick","onClientOptionUpdated","onMobSettingUpdated","onInventoryUpdated","onChestUpdated","onWorldChangeBlock","onCreateBloxdMeshEntity","onEntityCollision","onPlayerAttemptSpawnMob","onWorldAttemptSpawnMob","onPlayerSpawnMob","onWorldSpawnMob","onWorldAttemptDespawnMob","onMobDespawned","onPlayerAttack","onPlayerDamagingOtherPlayer","onPlayerDamagingMob","onMobDamagingPlayer","onMobDamagingOtherMob","onPlayerKilledOtherPlayer","onMobKilledPlayer","onPlayerKilledMob","onMobKilledOtherMob","onPlayerPotionEffect","onPlayerDamagingMeshEntity","onPlayerBreakMeshEntity","onPlayerUsedThrowable","onPlayerThrowableHitTerrain","onTouchscreenActionButton","onTaskClaimed","onChunkLoaded","onPlayerRequestChunk","onItemDropCreated","onPlayerStartChargingItem","onPlayerFinishChargingItem","doPeriodicSave"];multi_callbacks={};for(const e of callbacks)multi_callbacks[e]=[];function __init__(){for(const e of callbacks)multi_callbacks[e].length>0&&(globalThis[e]=(n,o,a,t,l,r,i,y,c,P)=>{for(const m of multi_callbacks[e])m(n,o,a,t,l,r,i,y,c,P)})}function addCb(e,n){if(!callbacks.includes(e))throw{name:"ArgumentError",message:"argument #1: expected valid callback name"};if("function"!=typeof n)throw{name:"ArgumentError",message:"argument #2: expected function"};multi_callbacks[e].push(n)};`;

      let found = false;

      for (const name of callbacks) {
        const fnRegex = new RegExp(`function\\s+${name}\\s*\\(([^)]*)\\)\\s*{`, "g");
        const arrowRegex = new RegExp(`\\b${name}\\s*=\\s*\\(([^)]*)\\)\\s*=>\\s*{`, "g");

        if (fnRegex.test(input) || arrowRegex.test(input)) found = true;

        input = input.replace(fnRegex, (_, args) => `addCb("${name}", (${args.trim()}) => {`);
        input = input.replace(arrowRegex, (_, args) => `addCb("${name}", (${args.trim()}) => {`);
      }

      const output = minifiedCbSetup + "\n\n" + input + (found ? "\n\n__init__();" : "");
      return output
}
