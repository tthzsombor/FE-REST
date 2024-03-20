import { useState, useEffect } from 'react';

interface Menetrend {
  id: number;
  erkezes: string;
  honnan: string;
  hova: string;
}

interface Props {
  reload: boolean;
}

export function Menetrendek({ reload }: Props){
    const [menetrend, setMenetrend] = useState<Menetrend[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/menetrend');
          const data: Menetrend[] = await response.json();
          setMenetrend(data); 
        } catch (e) {
          console.error('Hiba a lekérdezéskor:', e);
        }
      };
  
      fetchData();
    }, [reload]);
  
    return (
      <div>
        <table>
          <tr>
              <th>Állomás</th>
              <th>Érkezés</th>
          </tr>
               <tr>
                   {menetrend.map(menetrend=>(
               <>
               <td key={menetrend.id}>{menetrend.honnan}</td>
               <td key={menetrend.id}>{menetrend.hova}</td>
               </>
              ))}
                </tr>
         
        </table>
      </div>
    );
}

export default Menetrendek;