const getFiles = async (folderId: string, uid: string) => {
  let files: any[] = []
  const q = query(
    collection(db, 'folders', folderId, 'files'),
    where('uid', '==', uid),
    where('isArchive', '==', false)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    files.push({ ...doc.data(), id: doc.id })
  })

  return files
}

const DocumentTrashPage = () => {
  return <div>DocumentTrashPage</div>
}

export default DocumentTrashPage
