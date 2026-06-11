"use client"

// Buyer Form Component
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
//import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
//import * as z from "zod"
import { InputFiled } from "../InputFiled";
import {
    createBuyerSchema,
    CreateBuyerSchemaType
};
import {
    createBuyer,
    updateBuyer
}
import { toast } from "react-hot-toast"
import { useFormState } from "react-dom"

type BuyerFormProps = {
    type: "create" | "update";
    data?: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    relatedData?: any;
}

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: BuyerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });