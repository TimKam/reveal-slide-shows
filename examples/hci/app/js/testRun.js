console.log(JSson)

const Belief = JSson.Belief
const Plan = JSson.Plan
const Agent = JSson.Agent
const Environment = JSson.Environment

const generateBeliefs = mode => ({
    ...Belief('turn', 0),
    ...Belief('coins', {}),
    ...Belief('mode', mode),
    ...Belief('history', []),
    ...Belief('currentOffer', '')
})

const plans = [
    // accept all offers that propose a split that returns at least *something* for the bot
    Plan(
        beliefs => beliefs.turn % 2 === 1 && beliefs.currentOffer > 0,
        () => ({ action: 'accept' })
    ),
    // reject all offers that propose a split that returns nothing for the bot
    Plan(
        beliefs => beliefs.turn % 2 === 1 && beliefs.currentOffer <= 0,
        () => ({ action: 'decline' })
    ),
    // offer a split of 80:20 (bot:human) initially
    Plan(
        beliefs => beliefs.turn % 2 === 0 && beliefs.history.length === 0,
        () => ({ action: [
            [80, 20],
            'Let\'s start. It is my turn to take the role of the proposer. I give you 20 coins and keep the remaining coins. As the responder, do you accept the offer?',
            'Let\'s start. It is my turn to take the role of the proposer. Because I am nice, I give you 20 coins and keep the remaining coins. As the responder, do you accept the offer?'
        ] })
    ),
    /* If the previous human offer was between 1 and 100 and
    if the human rejected the previous offer and the human’s last offer is less than or equal to
    the agent’s previous offer, increase the last offer by 15, if possible. */
    Plan(
        beliefs => {
            const lastHumanOffer = !(beliefs.history[0] && beliefs.history[beliefs.history.length - 1]) ? [1] :
                beliefs.history[beliefs.history.length - 1].offer
            const lastAgentOffer = !(beliefs.history[1] && beliefs.history[beliefs.history.length - 2]) ? [1] :
                beliefs.history[beliefs.history.length - 2].offer
            const lastHumanReaction = !(beliefs.history[1] && beliefs.history[beliefs.history.length - 2]) ? false :
                beliefs.history[beliefs.history.length - 2].reaction
            return lastHumanOffer[0] <= lastAgentOffer[1] && lastHumanReaction === 'decline'
        },
        beliefs => ({ action: [
            [beliefs.history[beliefs.history.length - 2].offer[0] - 15, beliefs.history[beliefs.history.length -2].offer[1] + 15],
            `I give you ${beliefs.history[beliefs.history.length - 2].offer[1] + 15} coins and keep the remaining coins. As the responder, do you accept the offer?`,
            `Although you shared a lower amount of coins with me the previous time, I am nice and increase my offer to you; I give you ${beliefs.history[beliefs.history.length - 2].offer[1] + 15} coins and keep the remaining coins. As the responder, do you accept the offer?`
        ] })
    ),
    /* If the previous human offer was between 1 and 100 and
    if the human did not reject the previous offer, match the human's previous offer */
    Plan(
        beliefs => {
            const lastHumanOffer = !(beliefs.history[0] && beliefs.history[beliefs.history.length - 1]) ? [0] :
                beliefs.history[beliefs.history.length - 1].offer
            const lastHumanReaction = !(beliefs.history[1] && beliefs.history[beliefs.history.length - 2]) ? false :
                beliefs.history[beliefs.history.length - 2].reaction
            return lastHumanOffer[0] > 0 && lastHumanReaction !== 'reject'
        },
        beliefs => ({ action: [
            [beliefs.history[beliefs.history.length -1].offer[1], beliefs.history[beliefs.history.length -1].offer[1]],
            `I give you ${beliefs.history[beliefs.history.length -1].offer[1]} coins and keep the remaining coins. As the responder, do you accept the offer?`,
            `Because you shared the same amount of coins with me the previous time, I pay the favor back and give you ${beliefs.history[beliefs.history.length -1].offer[1]} coins and keep the remaining coins. As the responder, do you accept the offer?`
        ] }
        )
    ),
    /* If the previous offer was 0, propose 1 */
    Plan(
        beliefs => {
            const lastHumanOffer = !(beliefs.history[0] && beliefs.history[beliefs.history.length - 1]) ? [1] :
                beliefs.history[beliefs.history.length - 1].offer
            return lastHumanOffer[0] === 0
        },
        () => ({ action: [
            [99, 1],
            'I give you 1 coin and keep the remaining coins. As the responder, do you accept the offer?',
            'Although you did not share anything with me last time, I am nice and give you 1 coin and keep the remaining coins. As the responder, do you accept the offer?'
        ] })
    )
]

const initialState = generateBeliefs(Math.random() < 0.5 ? 'explanations' : 'noExplanations') 

const bot = new Agent('bot', initialState, {}, plans)

const updateState = (actions, _, currentState) => {
    const history = currentState.history
    if (actions[0] && actions[0].action === 'decline') {
        history[history.length - 1].reaction = 'decline'
    } else if (actions[0] && actions[0].action === 'accept') {
        history[history.length - 1].reaction = 'accept'
    } else if (actions[0] && actions[0].action){
        const feedback = currentState.mode === 'explanations' ?
            actions[0].action[2] :
            actions[0].action[1]
        history.push({offer: actions[0].action[0], feedback})
    }
    const turn = ++currentState.turn
    return { ...currentState, history, turn}
}

const environment = new Environment(
    [bot],
    initialState,
    updateState
)

const generateAgentAction = () => {
    environment.run(1)
    const currentState = environment.history[environment.history.length - 1]
    if (currentState.turn % 2 === 1) {
        return `<div class="agent-feedback">${currentState.history[currentState.turn - 1].feedback}</div>`
    } else {
        return `<div class="agent-feedback">${currentState.history[currentState.turn - 1].reaction}</div>`
    }
}

const accept = () => {
 const historyLength = environment.agents.bot.beliefs.history.length
 environment.agents.bot.beliefs.history[historyLength - 1].reaction = 'accept'
}

const decline = () => {
    const historyLength = environment.agents.bot.beliefs.history.length
    environment.agents.bot.beliefs.history[historyLength - 1].reaction = 'decline'
}

const propose = split => {
    environment.state.currentOffer = split[0]
    environment.state.history.push({ offer: split })
}

const speak = (length=5) => {
    let animationCount = 0
    const animate = () => {
        anime({ 
            targets: '.bot-mouth',
            width: ['60px', '40px', '60px'],
            marginLeft: ['85px', '95px', '85px'],
            marginRight: ['85px', '95px', '85px'],
            borderRadius: ['20%', '60%', '20%'],
            height: ['20px', '40px', '20px'],
            marginTop: ['90px', '80px', '90px'],
            easing: 'easeInOutQuad'
        })
        animationCount++
        if (animationCount === length) clearInterval(speechAnimation)

    }
    const speechAnimation = setInterval(animate, 500)
}

const blink = (length=2) => {
    let animationCount = 0
    const animate = () => {
        anime({
            targets: '.eye',
            borderRadius: ['5%', '100%', '80%'],
            easing: 'easeInOutQuad'
        })
        animationCount++
        if (animationCount === length) clearInterval(blinkAnimation)
    }
    const blinkAnimation = setInterval(animate, 1000 * Math.random())
}

setInterval(() => Math.random() > 0.5 ? speak() : blink(), 2000)


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('agent-interface').innerHTML = generateAgentAction()
    document.getElementById('responder').style.visibility = "visible"
    document.getElementById('proposer').style.visibility = "hidden"

    document.getElementById('accept').onclick = () => {
        accept()
        document.getElementById('responder').style.visibility = "hidden"
        document.getElementById('proposer').style.visibility = "visible"
    }
    document.getElementById('reject').onclick = () => {
        decline()
        document.getElementById('responder').style.visibility = "hidden"
        document.getElementById('proposer').style.visibility = "visible"
    }
    document.getElementById('propose').onclick = () => {
        const coinsBot = parseInt(document.getElementById('proposal').value)
        const coinsHuman = 100 - coinsBot
        propose([coinsBot, coinsHuman])
        document.getElementById('agent-interface').innerHTML = generateAgentAction()
        document.getElementById('proposer').style.visibility = "hidden"
        setTimeout(() => {
            document.getElementById('agent-interface').innerHTML = generateAgentAction()
            document.getElementById('responder').style.visibility = "visible"
        }, 2000)
    }

})