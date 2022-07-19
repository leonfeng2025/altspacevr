import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default class HelloWorld {
	private text: MRE.Actor = null;
	private item1: MRE.Actor = null;
	private item2: MRE.Actor = null;
	private item3: MRE.Actor = null;
	private item4: MRE.Actor = null;

	private assets: MRE.AssetContainer;
	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	private started() {
		
		this.assets = new MRE.AssetContainer(this.context);
		this.item1 = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId:'artifact:2046243210971316546'
		})
		this.item1.grabbable = true;
	}
}
