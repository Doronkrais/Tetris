const SHAPE_TYPE = ["L", "L_REV", "DOG", "DOG-REV", "LINE", "SQUARE", "PLUS"]

function getBaseShape(shapeType) {
    let baseShape = {}
    baseShape["DOG"] = [{col:0, row:0},{col:1, row:0}, {col:-1, row:1}, {col:0, row:1}] 
    baseShape["DOG_REV"] = [{col:0, row:0},{col:1, row:0}, {col:-1, row:1}, {col:0, row:1}] 
    baseShape["L"] = [{col:-1, row:-1},{col:0, row:-1}, {col:0, row:0}, {col:0, row:1}] 
    baseShape["L_REV"] = [{col:0, row:-1},{col:1, row:-1}, {col:0, row:0}, {col:0, row:1}] 
    baseShape["SQUARE"] = [{col:0, row:0},{col:1, row:0}, {col:0, row:1}, {col:1, row:1}] 
    baseShape["LINE"] = [{col:0, row:-2},{col:0, row:-1}, {col:0, row:0}, {col:0, row:1}] 
    baseShape["PLUS"] = [{col:0, row:-1},{col:-1, row:0}, {col:0, row:0}, {col:1, row:0}] 

    return baseShape[shapeType]
}

function RotateShape(baseShape, orientation) {
    rotateShape = baseShape
    for(i=0; i < orientation; i++) {
        rotateShape = rotateShape.map(sq => {return{col:-sq.row , row:sq.col}})
    }
    return rotateShape
}

function getShape(shapeType,top, left, shape_orient) {
    baseShape = getBaseShape(shapeType)
    rotateShape = RotateShape(baseShape, shape_orient)
    shapWithOffSet = rotateShape.map(square => {
        return {row: square.row + top, col:square.col + left}
    })
    return shapWithOffSet
}