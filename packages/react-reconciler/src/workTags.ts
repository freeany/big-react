export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; // 挂载的根节点对应的fiber节点类型 ReactDom.render

export const HostComponent = 5; // div的fiber节点类型
// <div>123</div>
export const HostText = 6; // 123文本对应的fiber类型
