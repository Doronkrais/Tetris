function GenerateNewShape() {
    newShape = {
        shapeType: SHAPE_TYPE[Math.floor(Math.random() * SHAPE_TYPE.length)],
        top:0,
        left: BoardSize.cols / 2 - 1,
        shapeOrient: 0
    }
    newShape.squareArr = getShape(newShape.shapeType, newShape.top, newShape.left, newShape.shapeOrient)
    return newShape
}
function drawFallingShape() {
    curShape.squareArr.forEach(square => { fillSquare(square) })
}

function Init_Occupied_Squares() {
    retval = []
    for(i=0; i < BoardSize.rows; i++) {
        boardRow = Array(BoardSize.cols).fill(false)
        retval.push(boardRow)
    }
    return retval
}

function DrawFrame() {
    clearBoard()
    drawBoard()
    drawGrid()
    drawFallingShape() 
    drawOcuupiedSquares()
}

function IsSquareOccuiped(square) {
    if(square.row >= BoardSize.rows || square.col < 0 || square.col >= BoardSize.cols){
        return true; 
    }
    if(square.row < 0)
        return false
    return occupiedSquares[square.row][square.col]
}

function IsShapeOccupied(shape) {
    return shape.some(square => IsSquareOccuiped(square))

}

function AddFallingShapeToOccupiedSquares() {
    curShape.squareArr.forEach(shapeSquare => {
        if(shapeSquare.row < 0){
            clearInterval(intervalId)
            return 
        } else
            occupiedSquares[shapeSquare.row][shapeSquare.col] = true})

}

function RemoveFullLines() {
    fullLines = []
    for(i=0; i < occupiedSquares.length; i++){
        if(occupiedSquares[i].every(square => square))
            fullLines.push(i)
    }
    while(fullLines.length > 0){
        for(i= fullLines[0]; i > 0; i--){
            occupiedSquares[i] = occupiedSquares[i - 1]
        }
        occupiedSquares[0] = Array(BoardSize.cols).fill(false)
        fullLines.shift()
    }

}

function drawOcuupiedSquares() {
    for(i=0; i< occupiedSquares.length; i++){
        for(j=0; j< occupiedSquares[i].length; j++){
            if(occupiedSquares[i][j])
                fillSquare({row:i, col:j})
        }
    }
}

function MainLoop() {
    DrawFrame()

    movedDownShape = getShape(curShape.shapeType, curShape.top + 1, curShape.left, curShape.shapeOrient)
    if(IsShapeOccupied(movedDownShape)) {
        AddFallingShapeToOccupiedSquares()
        RemoveFullLines()
        curShape = GenerateNewShape()
    } 
    else {
    curShape.squareArr = movedDownShape
    curShape.top++
    }
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault()
            movedLeftShape = getShape(curShape.shapeType, curShape.top , curShape.left -1, curShape.shapeOrient)
            if(!IsShapeOccupied(movedLeftShape)) {
                curShape.squareArr = movedLeftShape
                curShape.left--
            }
            break;
        case 'ArrowRight':
            e.preventDefault()
            movedRightShape = getShape(curShape.shapeType, curShape.top , curShape.left +1, curShape.shapeOrient)
            if(!IsShapeOccupied(movedRightShape)) {
                curShape.squareArr = movedRightShape
                curShape.left++
            }
            break;
        case 'ArrowUp':
            e.preventDefault()
            rotatedShape = getShape(curShape.shapeType, curShape.top , curShape.left, (curShape.shapeOrient + 1) % 4 )
            if(!IsShapeOccupied(rotatedShape)) {
                curShape.squareArr = rotatedShape
                curShape.shapeOrient = (curShape.shapeOrient + 1) % 4
            }
            break;
    }
})

const BoardSize = {rows: 20, cols: 10}
curShape = GenerateNewShape()
occupiedSquares = Init_Occupied_Squares()
intervalId = setInterval(MainLoop,300)



/*
fillSquare({row:0,col:0})
fillSquare({row:3,col:5})
*/
 


