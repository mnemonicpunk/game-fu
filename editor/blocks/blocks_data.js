Blockly.Blocks['data_set_local_number'] = {
    init: function() {
        this.jsonInit({
            "message0": "Set local number %1 to %2 ",
            "args0": [
                { 'type': 'input_value', 'name': 'VARNAME', 'check': 'String' },
                { 'type': 'input_value', 'name': 'VARVALUE', 'check': 'Number' }
            ],
            "inputsInline": true,
            "colour": 330
        });
    }
}
Blockly.Blocks['data_set_local_string'] = {
    init: function() {
        this.jsonInit({
            "message0": "Set local string %1 to %2 ",
            "args0": [
                { 'type': 'input_value', 'name': 'VARNAME', 'check': 'String' },
                { 'type': 'input_value', 'name': 'VARVALUE', 'check': 'String' }
            ],
            "inputsInline": true,
            "colour": 330
        });
    }
}
Blockly.JavaScript['data_set_local_number'] = function(block) {
    let VARNAME = Blockly.JavaScript.valueToCode(block, 'VARNAME', Blockly.JavaScript.ORDER_ADDITION) || '"temp"';
    let VARVALUE = Blockly.JavaScript.valueToCode(block, 'VARVALUE', Blockly.JavaScript.ORDER_ADDITION) || '0';
    let code = "this.setLocalNumber(" + VARNAME + ", " + VARVALUE + ");\n";
    return code;
}
Blockly.JavaScript['data_set_local_string'] = function(block) {
    let VARNAME = Blockly.JavaScript.valueToCode(block, 'VARNAME', Blockly.JavaScript.ORDER_ADDITION) || '"temp"';
    let VARVALUE = Blockly.JavaScript.valueToCode(block, 'VARVALUE', Blockly.JavaScript.ORDER_ADDITION) || '';
    let code = "this.setLocalNumber(" + VARNAME + ", " + VARVALUE + ");\n";
    return code;
}