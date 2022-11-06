import Image from 'next/image'

const worldId = {
    marginTop: "1rem"
  };
  
function Avatar() {
  return <Image style={worldId} src="/world.svg" alt="me" width="119px" height="16px" />
}

export default Avatar