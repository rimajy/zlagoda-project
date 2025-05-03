import { useCurrentEmployee } from '@/shared/hooks/auth/useCurrentEmployee'

export const UserInfo = () => {
  const { data, isSuccess } = useCurrentEmployee()

  return isSuccess ? (
    <div className="text-center">
      <h2 className="font-bold text-3xl">User Info</h2>
      <p>First Name: <span>{data?.empl_name}</span></p>
      <p>Surname: <span>{data?.empl_surname}</span></p>
      <p>Patronymic: <span>{data?.empl_patronymic}</span></p>
      <p>Role: <span>{data?.empl_role}</span></p>
      <p>Date of Birth: <span>{String(data?.date_of_birth)}</span></p>
      <p>Date of Start: <span>{String(data?.date_of_start)}</span></p>
      <p>Salary: <span>{data?.salary}</span></p>
      <p>Phone number: <span>{data?.phone_number}</span></p>
      <p>City: <span>{data?.city}</span></p>
      <p>Street: <span>{data?.street}</span></p>
      <p>Zip: <span>{data?.zip_code}</span></p>
    </div>
  ) : (<p>Loading...</p>);
}