import Stack from "./lib/Stack.js"

const colors = [
    { color: '#26A41F', count: 0 },
    { color: '#0000FF', count: 0 },
    { color: '#D21229', count: 0 },
    { color: '#DC8B17', count: 0 },
    { color: '#5B19CD', count: 0 },
    { color: '#E3EC0C', count: 0 }
]
let stacks
let boxes
const stepSpan = document.getElementById('step')

const app = document.getElementById('app').innerHTML

document.getElementById('btn-new').addEventListener('click', () => {
    createGame()
})

// document.getElementById("btn-restart").addEventListener('click', () => {
//     document.getElementById('app').innerHTML = lastGame.app
//     stepSpan.innerText = 0
// })

const createGame = () => {
    document.getElementById('app').innerHTML = app
    for (let index = 0; index < colors.length; index++) {
        colors[index].count = 0
    }
    stepSpan.innerText = 0

    stacks = []
    boxes = []

    constructStacks()
    createBoxes()
    addColor()

    toggleActive()
}

const constructStacks = () => {
    for (let i = 0; i < 8; i++) {
        const stack = new Stack()
        stacks.push(stack)
    }
}

const checkIsFinished = () => {
    for (let i = 0; i < stacks.length; i++) {
        if (stacks[i].size() > 0) {
            if (!stacks[i].allSame) return
        }
    }

    alert(`Congratulations, Completed in ${stepSpan.innerText} steps`)
}

const createBoxes = () => {
    while (boxes.length < 6) {
        let r = Math.floor(Math.random() * 8)
        if (boxes.indexOf(r) === -1) boxes.push(r)
    }
}

const toggleActive = () => {
    const boxes = document.getElementsByClassName('box')
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', () => {
            const activeElement = document.getElementsByClassName('active')[0]
            if (activeElement) {
                activeElement.classList.toggle("active");
                let id = Number(activeElement.id)

                if (stacks[i].size() === 4) return
                if (stacks[i].size() > 0 && stacks[id].peek() !== stacks[i].peek()) return


                let color = stacks[id].pop()
                let count = 1
                activeElement.removeChild(activeElement.lastChild)

                while (stacks[id].peek() === color && count + stacks[i].size() < 4) {
                    stacks[id].pop()
                    count++
                    activeElement.removeChild(activeElement.lastChild)
                }

                for (let j = 0; j < count; j++) {
                    let node = document.createElement("DIV")
                    node.style.height = '29px'
                    node.style.backgroundColor = color
                    boxes[i].appendChild(node)
                    stacks[i].push(color)
                }

                stepSpan.innerText = Number(stepSpan.innerText) + 1
                checkIsFinished()
            }
            else {
                if (stacks[i].size() > 0 || stacks[i].size() === 4) boxes[i].classList.toggle("active");
            }
        })
    }

}

const addColor = () => {
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < 4; j++) {
            let random = Math.floor(Math.random() * colors.length)

            if (colors[random].count >= 4) {
                j--
                continue
            }

            colors[random].count++
            let node = document.createElement("DIV")
            node.style.height = '29px'
            node.style.backgroundColor = colors[random].color
            document.getElementById(boxes[i]).appendChild(node)
            stacks[boxes[i]].push(colors[random].color)
        }
    }
}


createGame()