import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default class HelloWorld {
	private text: MRE.Actor = null;
	private robot: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	private started() {
		
		this.assets = new MRE.AssetContainer(this.context);
		this.robot = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId:'artifact:2049919613017260476'
		})
		// this.item1.grabbable = true; 2049948379416363573
		const buttonBehavior = this.robot.setBehavior(MRE.ButtonBehavior);

		// Trigger the grow/shrink animations on hover.
		buttonBehavior.onHover('enter', () => {
			console.log("onHover enter");
			this.text = MRE.Actor.CreateFromLibrary(this.context,{
				resourceId:'artifact:2049948379416363573'
			});
			const trans = new MRE.Transform();
			trans.position = new MRE.Vector3(-1, 1.4, 0.2);
			trans.rotation = new MRE.Quaternion(0, -0.6, 0);
			this.text.transform.app = trans;
		});

		buttonBehavior.onHover('exit', () => {
			console.log("onHover exit");
			this.text.destroy();
		});
	}
}
