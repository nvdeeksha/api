import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const RadioInput = ({ submit }) => {
  const inputsData = {};

  const [initialValuesObj, setValues] = useState({
    name: "",
    label: "",
  });

  const [count, setCount] = useState(0);
  const [submitValues, setSubmitValues] = useState({});
  const addOptions = () => {
    return new Array(count).fill().map((_, val) => (
      <div key={val}>
        <Field
          component={TextField}
          name={"label" + val}
          id={"label" + val}
          type="text"
          label="label"
        />
        <Field
          component={TextField}
          name={"value" + val}
          id={"value" + val}
          type="text"
          label="Radio Value"
          style={{ marginLeft: "10.5vw" }}
        />
      </div>
    ));
  };

  useEffect(() => {
    if (submitValues.values) {
      let name = "";
      let label = "";
      let labelArr = [];
      let valueArr = [];
      let optionList = [];

      for (let data in submitValues.values) {
        if (data === "name") {
          name = submitValues.values[data];
        }
        if (data === "label") {
          label = submitValues.values[data];
        }
        if (data !== "name" && data !== "label") {
          if (data.slice(0, 1) === "l") {
            labelArr.push(submitValues.values[data]);
          } else {
            valueArr.push(submitValues.values[data]);
          }
        }
      }

      for (let i = 0; i < labelArr.length; i++) {
        optionList.push({ label: labelArr[i], value: valueArr[i] });
      }
      if (name !== "" && label !== "") {
        inputsData.questionType = "radio";
        inputsData.questionName = name;
        inputsData.label = label;
        inputsData.options = optionList;
        submit(inputsData);
      }
    }
  }, [submitValues]);

  const handleOptions = () => {
    const obj = { ...initialValuesObj };
    obj["label" + count] = "";
    obj["value" + count] = "";
    // console.log(initialValuesObj, count);
    setCount(count + 1);
    setValues(obj);

    // let name = document.getElementById("name").value;
    // let label = document.getElementById("label").value;
    // if (name && label !== "") {
    //   (inputsData.questionType = "checkbox"),
    //     (inputsData.questionName = name),
    //     (inputsData.label = label),
    //     submit(inputsData);
    // }
  };
  return (
    <>
      <Formik
        initialValues={initialValuesObj}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // console.log(values);
          setSubmitValues({ values });
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Please enter name"),
          label: Yup.string().required("Label required"),
        })}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="name"
                    id="name"
                    type="text"
                    label="Radio Name"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="label"
                    id="label"
                    type="text"
                    label="label"
                  />
                </Grid>
              </Grid>
              {count > 0 ? addOptions() : null}
              <br />
              <Button
                type="button"
                variant="contained"
                color="primary"
                endIcon={<AddCircleRoundedIcon style={{ fontSize: 23 }} />}
                onClick={handleOptions}
              >
                Options
              </Button>

              {isSubmitting}
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={submitForm}
              >
                Add Data
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RadioInput;