const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');

/**
 * omi生态专用菜单树：继承重写 vscode.TreeItem 相关菜单树功能
 * @param label 
 */
class TreeItemOmiEco extends vscode.TreeItem {
    constructor(label, labelAdd, collapsibleState, command) {
        super(label, collapsibleState);  //添加菜单节点并设置菜单节点的可折叠状态
        this.label = label;  //菜单节点主内容(突出显示)
        this.labelAdd = labelAdd;    //菜单附加内容(不突出显示)
        this.collapsibleState = collapsibleState;  //菜单树折叠状态(菜单树是否可折叠)
        this.command = command;  //选择菜单树项时应该执行的[命令]
        //菜单树图标路径
        this.iconPath = {
            light: path.join(__filename, '..', '..', '..', 'assets', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', '..', 'assets', 'dark', 'dependency.svg')
        };
        this.contextValue = 'edit';  //树项的上下文值。这可以用于在树中贡献项目(contribute)特定的操作。
    }
    /**
     * 将鼠标悬停在此项上时的工具提示文本。
     */
    get tooltip() {
        return `${this.label}-${this.labelAdd}`;
    }
    /**
     * 菜单栏附加内容插入(一种人类可读的字符串，其显示不太突出。如果为真，则从resourceUri派生，如果为假，则不显示。)
     */
    get description() {
        return this.labelAdd;
    }
}
exports.TreeItemOmiEco = TreeItemOmiEco;
