import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default class HelloWorld {
	private structAnimation: MRE.Actor = null;
	private showBtn: MRE.Actor = null;
	private stopBtn: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	private started() {
		
		this.assets = new MRE.AssetContainer(this.context);

		this.showBtn = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId:'artifact:2053652604814099033'
		});
		const showTrans = new MRE.Transform();
		showTrans.position = new MRE.Vector3(0, 0.6, 0);
		this.showBtn.transform.app = showTrans;

		this.stopBtn = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId:'artifact:2053652605074145882'
		});

		const stopBtnBehavior = this.stopBtn.setBehavior(MRE.ButtonBehavior);
		stopBtnBehavior.onClick(() => {
			console.log("stop onClick");
			if (this.structAnimation !== null) {
				this.structAnimation.destroy();
			}
		})

		const showBtnBehavior = this.showBtn.setBehavior(MRE.ButtonBehavior);
		showBtnBehavior.onClick(() => {
			console.log("show onClick");
			if (this.structAnimation !== null) {
				this.structAnimation.destroy();
			}
			this.structAnimation = MRE.Actor.CreateFromLibrary(this.context,{
				resourceId:'artifact:2053579992813536118'
			});
			const trans = new MRE.Transform();
			trans.position = new MRE.Vector3(0, 0, 2);
			trans.rotation = new MRE.Quaternion(0, 0, 0);
			this.structAnimation.transform.app = trans;
			console.log(this.structAnimation.targetingAnimations);
		});

	}
}
