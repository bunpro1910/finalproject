
import Search from '@/components/pages/Search'

export default function page({params}) {
  return (
    <>
    <div><Search name={params.name}/></div>
    </>
  );
}
