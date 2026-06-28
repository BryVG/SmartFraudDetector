


export default function DynamicForm({
    config,
    type,
    data,
    relatedData,
    onSubmit,
}) {

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        defaultValues:data
    });

    return (

<form
onSubmit={handleSubmit(onSubmit)}
>

<h2>

{type==="create"
?`Cadastrar ${config.title}`
:`Editar ${config.title}`}

</h2>

{
config.fields.map(field=>(

<DynamicField

key={field.name}

field={field}

register={register}

errors={errors}

relatedData={relatedData}

/>

))
}

<button>

Salvar

</button>

</form>

)

}