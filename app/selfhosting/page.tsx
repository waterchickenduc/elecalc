export default function SelfHostingPage() {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Self-Hosting Instructions</h1>
  
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js 18 or higher (22.x recommended)</li>
              <li>npm or yarn package manager</li>
              <li>Git (optional, for cloning the repository)</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">Installation Steps</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p className="font-medium">Clone or download the repository</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>git clone https://github.com/waterchickenduc/elecalc.git</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">
                  Alternatively, download the ZIP file and extract it to your preferred location.
                </p>
              </li>
  
              <li>
                <p className="font-medium">Navigate to the project directory</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>cd elecalc</code>
                </pre>
              </li>
  
              <li>
                <p className="font-medium">Install dependencies</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>npm install</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Or if you prefer yarn:</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>yarn install</code>
                </pre>
              </li>
  
              <li>
                <p className="font-medium">Start the development server</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>npm run dev</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">Or with yarn:</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>yarn dev</code>
                </pre>
              </li>
  
              <li>
                <p className="font-medium">Open your browser</p>
                <p>
                  Navigate to <code className="bg-muted px-2 py-1 rounded">http://localhost:3000</code> to view the
                  application.
                </p>
              </li>
            </ol>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">Production Deployment</h2>
            <p className="mb-3">To deploy the application for production:</p>
  
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p className="font-medium">Build the application</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>npm run build</code>
                </pre>
              </li>
  
              <li>
                <p className="font-medium">Start the production server</p>
                <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                  <code>npm start</code>
                </pre>
              </li>
            </ol>
  
            <p className="mt-4">
              Alternatively, you can deploy this application to platforms like Vercel, Netlify, or any other hosting
              service that supports Next.js applications.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">Customizing Data</h2>
            <p className="mb-3">
              The application uses JSON files located in the <code className="bg-muted px-2 py-1 rounded">data/</code>{" "}
              directory. You can modify these files to update the game data:
            </p>
  
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <code className="bg-muted px-2 py-1 rounded">rune.json</code> - Contains rune data with stats
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">rune_stone.json</code> - Contains runestone data
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">rune_aura.json</code> - Contains aura effects
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">adventure_class.json</code> - Contains class data and stats
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">stat.json</code> - Contains the list of available stats
              </li>
            </ul>
          </section>
        </div>
  
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Data Sources</h2>
          <p>
            The data used in this application is sourced from the provided JSON files. If you need to update or modify the
            data, please refer to the original game documentation or community resources.
          </p>
        </div>
      </div>
    )
  }