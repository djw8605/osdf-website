import BriefcaseIcon from '@heroicons/react/outline/BriefcaseIcon';


/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  /*
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  */
  // We only want up to GB's, to show growth!
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  return numberWithCommas(parseFloat(bytes.toFixed(dp))) + ' ' + units[u];
}

function numberWithCommas(x) {
  if (typeof x === 'number') {
    return x.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return x;
  }
}

export default function ProjectModel({ open, setOpen, projects }) {

  if (!open || !projects || projects.length === 0) {
    return null;
  }
  console.log(projects);

  // Convert projects to array
  let projectsArray = Object.entries(projects);

  // Sort by usage
  projectsArray.sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? 'block' : 'hidden'}`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-2xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:justify-center sm:items-center">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-headline">
                    Project Usage - {projectsArray.length} Projects
                  </h3>
                  <div className="mt-2">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Project
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Usage
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsArray.map(([project, usage]) => (

                            <tr key={project} className="px-6 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <th scope="row" className='px-6'>
                                {project}
                              </th>
                              <td className="px-6">
                                {humanFileSize(usage)}
                              </td>
                            </tr>

                        ))}
                      </tbody>
                    </table >
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={() => setOpen(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lime-600 text-base font-medium text-white hover:bg l-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 sm:ml-3 sm:w-auto sm:text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
