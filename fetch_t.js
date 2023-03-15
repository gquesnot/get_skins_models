(async () => {
    console.log(
        (await (fetch("https://static.teemo.gg/riot-games/league-of-legends/models/creatures/kingporo-0.wasm"))).status
    )
})()