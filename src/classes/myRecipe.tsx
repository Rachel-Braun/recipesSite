export class myRecipe
{
    constructor(public _id:string, 
                public name:string, 
                public description:String, 
                public img:string, 
                public degree:Number, 
                public time:Number, 
                public type:String, 
                public ownerId:String, 
                public ingredient:{ name: string; amount: number; }[]
    )
    {

    }
}