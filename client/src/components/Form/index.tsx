import { ContextDataType } from "../../@types/data";
import { useContexts } from "../../context";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchMarker, updateMarker } from "../../api";

export default function Form() {
  const { isLoading, isError, data } = useQuery(["marker"], () =>
    fetchMarker()
  );
  const { onClick, center, changeCenter, onForm } =
    useContexts() as ContextDataType;

  const [bool, setBool] = useState(true);

  useEffect(() => {
    dataAddArray();
  }, [data]);

  const dataAddArray = () => {
    if (data != null && bool) {
      data.map((item: any) => {
        onForm({ lng: item.lng, lat: item.lat });
        changeCenter({ lng: item.lng, lat: item.lat });
      });
      setBool(false);
    }
  };

  const formik = useFormik({
    initialValues: { lat: center.lat, lng: center.lng },
    validationSchema,
    onSubmit: async (values: any, bag: any) => {
      try {
      } catch (e: any) {
        bag.setErrors({ general: e.response.data.message });
      }
      bag.resetForm();
    },
  });
  useEffect(() => {
    formik.setFieldValue("lat", center.lat);
    formik.setFieldValue("lng", center.lng);
    if (data != null) {
      updateMarker({ lat: center.lat, lng: center.lng }, data[0]._id);
    }
  }, [center, changeCenter]);
  useEffect(() => {
    formik.setFieldValue("lat", formik.values.lat);
    formik.setFieldValue("lng", formik.values.lng);
  }, [formik.values]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }
  return (
    <div className="form">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="lat">Latitude</FormLabel>
            <Input
              min="1"
              id="lat"
              name="lat"
              type={"number"}
              onBlur={(event) => {
                onForm({ ...center, lat: Number(event.target.value) });
                changeCenter({ ...center, lat: Number(event.target.value) });
                updateMarker(
                  { ...center, lat: Number(event.target.value) },
                  data[0]._id
                );
              }}
              value={formik.values.lat}
              onChange={formik.handleChange}
              isInvalid={Boolean(formik.errors.lat)}
            />
            {formik.errors.lat && (
              <Alert status="error">{formik.errors.lat}</Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lng">Longitude</FormLabel>
            <Input
              id="lng"
              name="lng"
              type={"number"}
              onBlur={(event) => {
                onForm({ ...center, lng: Number(event.target.value) });
                changeCenter({ ...center, lng: Number(event.target.value) });
                updateMarker(
                  { ...center, lng: Number(event.target.value) },
                  data[0]._id
                );
              }}
              value={formik.values.lng}
              onChange={formik.handleChange}
              isInvalid={formik.validateOnBlur && Boolean(formik.errors.lng)}
            />
            {formik.errors.lng && (
              <Alert status="error">{formik.errors.lng}</Alert>
            )}
          </FormControl>

          <Button
            onClick={() => {
              onClick([]);
              changeCenter({ lat: 41.015137, lng: 28.97953 });
            }}
            className="button"
          >
            Reset
          </Button>
          <Button className="button" onClick={() => {}}>
            Update Marker
          </Button>
        </form>
      </Box>
    </div>
  );
}
