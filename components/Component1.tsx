import React from 'react'

type Component1Props = {
    name: any;
}

const Component1 = ({name}: Component1Props) => {
    
  return (
    <div>
        {name}
    </div>
  )
}

export default Component1;

