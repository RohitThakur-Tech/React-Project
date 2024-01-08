import DepartmentModel from "../models/Department.js";

export const CreateDepartment = async (req, res) => {
  try {
    const departData = await DepartmentModel.create({
      name: req.body.name,
      image: req?.file?.filename,
      university: req.body.universityId,
    });
    if (departData) res.status(201).send({ message: "Department Created" });
    else res.status(404).send({ message: "Unable to create department " });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateDepartment = async (req, res) => {
  try {
    const departData = await DepartmentModel.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
        name: req.body.name,
        image: req?.file?.filename,
        university: req.body.universityId,
      }
    );
    if (departData) res.status(201).send({ message: "Department Update" });
    else res.status(404).send({ message: "Unable to update department " });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};


export const DeleteDepartment = async (req, res) => {
    try {
      const departData = await DepartmentModel.deleteOne(
        {
          _id: req.body._id,
        });
      if (departData.deletedCount==1) res.status(201).send({ message: "Department deleted" });
      else res.status(404).send({ message: "Unable to delete department " });
    } catch (e) {
      res.status(404).send({ error: e?.message });
    }
  };

  export const GetDepartment = async (req, res) => {
    try {
      const departData = await DepartmentModel.find();
      res.status(200).send({departData});
    } catch (e) {
      res.status(404).send({ error: e?.message });
    }
  };


//   export const GetDepartmentsByUniversityId=async (req,res)=>
// {
//     try
//     {
//         const departData=await DepartmentModel.find({
//             university:req.query.universityId,
//         }).populate("university");
//         res.status(200).send({departData});
//     }
//     catch(e)
//     {
//         res.status(404).send({error:e?.message});
//     }
// };
export const GetDepartmentsByUniversityId=async(req,res)=>{
    try
    {
        const departData=await DepartmentModel.find({
            university:req.query.universityId,
        }).populate("university");
        res.status(200).send({departData});
    }
    catch(e)
    {
        res.status(404).send({error:e?.message});
    }
}

