from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

# Load the trained model
model = joblib.load('7_15_model.pkl')
model1=joblib.load('16_20_model.pkl')
df_2023 = pd.read_csv('IPL_2023.bat_2023_over_srf.csv')
df_15_21 = pd.read_csv('IPL_2023.bat_over_srf_15_21.csv')
df_overrange = pd.read_csv('Overrange_score_stats (1).csv')

@app.route('/predict/<ovr>', methods=['POST'])
def predict(ovr):
    # Get the data from the request
    data = request.get_json()
    print(data,ovr)
    # Convert the data to a DataFrame
    df = pd.DataFrame([data],columns=['runs', 'run_rate', 'wickets', '6s', '4s', 'dot_count', 'balls_played'])
    print(df)


    if(ovr=='1'):
        runs = model.predict(df)
        predicted_runs=runs[0]
        df_overrange_filtered = df_overrange[(df_overrange['over_range'] == '7-15') & (df_overrange['runs'] >= predicted_runs - 7) & (df_overrange['runs'] <= predicted_runs + 7)]
        
    else:
        runs = model1.predict(df)
        predicted_runs=runs[0]
        df_overrange_filtered = df_overrange[(df_overrange['over_range'] == '16-20') & (df_overrange['runs'] >= predicted_runs - 7) & (df_overrange['runs'] <= predicted_runs + 7)]


    median_values=df_overrange_filtered[['runs', 'run_rate', 'wickets', '6s', '4s', 'dot_count', 'balls_played']].median()
   
    req_srf = (((median_values['runs'] - 4*median_values['4s'] - 6*median_values['6s'])/median_values['runs']) + median_values['6s'] + 0.66*median_values['4s'])/((median_values['dot_count']/median_values['balls_played']) + median_values['wickets']*2 + median_values['dot_count']*0.15 + 1)
    print("Required SRF:", req_srf)

   
    msg = {
        'stats':median_values.tolist(),
        'required_srf':req_srf.tolist(),
        "message":runs.tolist()
    }
    
    return jsonify(msg)

@app.route('/get_srf/<parm>', methods=['POST'])
def get_srf(parm):
    data = request.get_json()
    print(data)
    arr=data.get('batsmenVisibleCheckboxes')
    print(arr,parm)
    

    if(parm=='1'):
        cat1 = '1-6'
        cat = '0-5'

    if(parm=='2'):
        cat1 = '7-14'
        cat = '6-14'
 
    if(parm=='3'):
        cat1 = '15-20'
        cat = '15-20'

    # Get SRF for arr elements with category=cat1 from df_2023
    srf_2023 = df_2023[(df_2023['batter'].isin(arr)) & (df_2023['category'] == cat1)]['SRF']

    # Get SRF for arr elements with category=cat from df_15_21
    srf_15_21 = df_15_21[(df_15_21['bat'].isin(arr)) & (df_15_21['category'] == cat)]['SRF']

    return jsonify({'SRF_2023': srf_2023.to_list(), 'SRF_15_21': srf_15_21.to_list()})
   

# @app.route('/get_rank', methods=['POST'])
# def get_rank():
#     data=request.get_json()
#     print(data)

#     return "Hi"


if __name__ == '__main__':
    app.run(debug=True)