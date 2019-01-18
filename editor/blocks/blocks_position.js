Blockly.Blocks['position_set_x'] = {
    init: function() {
        this.jsonInit({
            "message0": "Set X position to %1",
            "args0": [
                { 'type': 'input_value', 'name': 'XPOS', 'check': 'Number' }
            ],
            "inputsInline": true,
            "colour": 210
        });
    }
}
Blockly.Blocks['position_set_y'] = {
    init: function() {
        this.jsonInit({
            "message0": "Set Y position to %1",
            "args0": [
                { 'type': 'input_value', 'name': 'YPOS', 'check': 'Number' }
            ],
            "inputsInline": true,
            "colour": 210
        });
    }
}
Blockly.Blocks['position_get_x'] = {
    init: function() {
        this.jsonInit({
            "message0": "Get X position",
            "output": "Number",
            "colour": 210
        });
    }
}
Blockly.Blocks['position_get_y'] = {
    init: function() {
        this.jsonInit({
            "message0": "Get Y position",
            "output": "Number",
            "colour": 210
        });
    }
}
Blockly.JavaScript['position_set_x'] = function(block) {
    let XPOS = Blockly.JavaScript.valueToCode(block, 'XPOS', Blockly.JavaScript.ORDER_ADDITION) || '0';
    let code = "this.x = " + XPOS + ";\n";
    return code;
}
Blockly.JavaScript['position_set_y'] = function(block) {
    let YPOS = Blockly.JavaScript.valueToCode(block, 'YPOS', Blockly.JavaScript.ORDER_ADDITION) || '0';
    let code = "this.y = " + YPOS + ";\n";
    return code;
}
Blockly.JavaScript['position_get_x'] = function(block) {
    let code = "this.x";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}
Blockly.JavaScript['position_get_y'] = function(block) {
    let code = "this.y";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}