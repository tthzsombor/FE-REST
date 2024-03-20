import React, { useState } from 'react';

interface MenetrendHOzzaadas {
  honnan: string;
  hova: string;
  ido: string;
}

interface Props {
  onReload: () => void;
}
  
export function Urlap({ onReload }: Props){
    const [formData, setFormData] = useState<MenetrendHOzzaadas>({
        honnan: '',
        hova: '',
        ido: ''
      });
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/menetrend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            console.error('Hiba a hozzáadáskor:', response.statusText);
            return;
          }
          onReload();
          setFormData({ honnan: '', hova: '', ido: '' });
        } catch (error) {
          console.error('Hiba a hozzáadáskor:', error);
        }
      };
    
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'from') {
          setFormData(prevState => ({
            ...prevState,
            to: value === 'Kerekerdő-felső' ? 'Kerekerdő-alsó' : 'Kerekerdő-felső'
          }));
        }
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Honnan:
            <select name="from" value={formData.honnan} onChange={handleSelectChange}>
                <option value=""/>
              <option value="Kerekerdő-felső">Kerekerdő-felső</option>
              <option value="Kerekerdő-alsó">Kerekerdő-alsó</option>
            </select>
          </label>
          <label className='m-5'>
            Hova:
            <input type="text" name="hova" value={formData.hova} readOnly />
          </label>
          <label >
            Út:
            <input type="time" name="ido" value={formData.ido} onChange={handleInputChange} />
          </label>
          <button className='m-5' type="submit">Hozzáadása</button>
        </form>
      );
}

export default Urlap;